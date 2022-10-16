import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { append, insertItem, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { filterByRating, filterByTags, filterByYear } from "@gallery/store/photos/photo.tools";
import { AlertService } from "@app/services/alert.service";
import { PhotoService } from "@gallery/services/photo.service";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";
import { ServerSentService } from "@app/common/services/server-sent.service";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";

export interface PhotoStateModel {
  photos: Photo[];
  currentPhoto: Photo;
  selectedPhotos: Photo[];
  downloads: Photo[];
  loadedPhotos: number;
  availablePhotos: number;
  tagFilter: string[];
  filterRating: number;
  filterFrom: number;
  filterTo: number;
  newDataAvailable: boolean;
  // comparePhotos: Photo[];
  // exportPhotos: Photo[];
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'PhotoState',
  defaults: {
    photos: [],
    downloads: [],
    selectedPhotos: [],
    currentPhoto: {id: '0', index: -1, tags: [], rating: 0, isSelected: false, fileName: '', recordDate: new Date()},
    newDataAvailable: true,
    availablePhotos: 0,
    loadedPhotos: 0,
    tagFilter: [],
    filterRating: 0,
    filterFrom: -1,
    filterTo: -1,
    loaded: false,
    loading: false,
  }
})

@Injectable()
export class PhotoState {

  constructor(private photoService: PhotoService,
              private pushService: ServerSentService,
              private alertService: AlertService) { }

  @Selector()
  static getPhotos(state: PhotoStateModel): Photo[] {
    return state.photos;
  }

  @Selector([PhotoState.getPhotos, PhotoState.getActiveTags])
  static getPhotosByTags(photos: Photo[], activeTags: string[]): Photo[] {
    if (activeTags.length == 0) {
      return photos;
    }
    return filterByTags(photos, activeTags);
  }

  @Selector([PhotoState.getPhotosByTags, PhotoState.getFilterRating])
  static getPhotosByTagsAndRating(photos: Photo[], rating: number): Photo[] {
    const result: Photo[] = [];
    for (const photo of photos) {
      if (photo.rating >= rating) {
        result.push(photo);
      }
    }
    return result;
  }

  @Selector([PhotoState.getPhotosByTags, PhotoState.getFilterRating, PhotoState.getFilterFrom, PhotoState.getFilterTo])
  static getFilteredPhotos(photos: Photo[], filterRating: number, filterFrom: number, filterTo: number): Photo[] {
    let filteredPhotos = filterByRating(photos, filterRating);
    console.log('PhotoState getFilteredPhotos: ',)
    filteredPhotos = filterByYear(filteredPhotos, filterFrom, filterTo);
    return filteredPhotos;
  }

  // @Selector()
  // static newDataAvailable(state: PhotoStateModel): Photo {
  // }

  @Selector()
  static getCurrentPhoto(state: PhotoStateModel): Photo {
    return state.currentPhoto;
  }

  @Selector()
  static getCurrentIndex(state: PhotoStateModel): number {
    if (state.currentPhoto) {
      return state.photos.indexOf(state.currentPhoto);
    }
    return 0;
  }

  @Selector()
  static getComparePhotos(state: PhotoStateModel): Photo[] {
    return state.photos.filter(photo => photo.isSelected);
  }

  @Selector()
  static getSelectedPhotos(state: PhotoStateModel): Photo[] {
    return state.selectedPhotos;
  }

  @Selector()
  static getAvailablePhotos(state: PhotoStateModel): number {
    return state.availablePhotos;
  }

  @Selector()
  static getActiveTags(state: PhotoStateModel): string[] {
    return state.tagFilter;
  }

  @Selector()
  static getFilterRating(state: PhotoStateModel): number {
    return state.filterRating;
  }

  @Selector()
  static getFilterFrom(state: PhotoStateModel): number {
    return state.filterFrom;
  }

  @Selector()
  static getFilterTo(state: PhotoStateModel): number {
    return state.filterTo;
  }

  @Selector()
  static getDownloads(state: PhotoStateModel): Photo[] {
    return state.downloads;
  }

  @Selector()
  static getLoadedPhotos(state: PhotoStateModel): number {
    return state.loadedPhotos;
  }

  // @Selector([PhotoState])
  // isDataSelected(state: PhotoStateModel): (photo: Photo) => boolean {
  //   return (photo: Photo) => state.downloads.includes(photo);
  // }

  //////////////////////////////////////////////////////////
  //          server sent new photos available
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetNewPhotosAvailable)
  setNewPhotosAvailable(ctx: StateContext<PhotoStateModel>): void {
    ctx.patchState({
      newDataAvailable: true // todo rename
    });
  }

  //////////////////////////////////////////////////////////
  //          meta data
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadMetaData)
  loadMetaData(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaData): Observable<Subscription> {
    return this.photoService.loadMetaData().pipe(
      map((metaDto: PhotoMetaDataDto) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.LoadMetaDataSuccess(metaDto))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.LoadMetaDataFail(error))
          )
        )
      )
    );
  }

  @Action(photoAction.LoadMetaDataSuccess)
  loadMetaDataSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataSuccess): void {
    console.log('PhotoState loadMetaDataSuccess: ',)
    ctx.patchState({
      availablePhotos: action.dto.count, loading: false
    });
  }

  @Action(photoAction.LoadMetaDataFail)
  loadMetaDataFail(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataFail): void {
    ctx.dispatch({loaded: false, loading: false});
    this.alertService.error('load meta data fail');
  }

  // region loading
  //////////////////////////////////////////////////////////
  //          load photos
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadPhotos)
  loadPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotos): Observable<Subscription> {
    const state = ctx.getState();
    if (state.loading) {
      return of(Subscription.EMPTY);
    }
    ctx.patchState({loading: true, loaded: false});
    const from: number = action.from ? action.from : state.photos.length;
    const unloadedPhotos: number = state.availablePhotos - state.photos.length;
    const count: number = unloadedPhotos < action.count ? unloadedPhotos : action.count;
    if (count == 0) {
      return of(Subscription.EMPTY);
    }
    return this.photoService.getPhotos(count, from)
      .pipe(
        map((dto: PhotoDto) =>
          asapScheduler.schedule(() => {
              ctx.dispatch(new photoAction.LoadPhotosSuccess(dto))
            }
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.LoadPhotosFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.LoadPhotosSuccess)
  loadPhotosSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosSuccess): void {
    const state = ctx.getState();
    let index = state.loadedPhotos;
    for (const photo of action.dto.photos) {
      photo.recordDate = new Date(Number(photo.recordDate));
      photo.index = index++;
    }
    const photos: Photo[] = [...state.photos, ...action.dto.photos]
    ctx.patchState({
      loadedPhotos: index, photos: photos, loaded: true, loading: false, currentPhoto: photos[0]
    });
  }

  @Action(photoAction.LoadPhotosFail)
  loadPhotosFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosFail): void {
    this.alertService.error('Load photos fail');
    dispatch({loaded: false, loading: false});
  }

  // endregion

  //////////////////////////////////////////////////////////
  //          set current
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetCurrentPhoto)
  setCurrentPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.SetCurrentPhoto): void {
    ctx.patchState({
      currentPhoto: action.photo
    });
  }

  @Action(photoAction.SetNextPhoto)
  setNextPhotoAction(ctx: StateContext<PhotoStateModel>, action: photoAction.SetNextPhoto): void {
    const photos = ctx.getState().photos;
    let index = photos.indexOf(ctx.getState().currentPhoto!);
    ctx.patchState({
      currentPhoto: photos[++index]
    });
  }

  @Action(photoAction.SetPreviousPhoto)
  setPreviousPhotoAction(ctx: StateContext<PhotoStateModel>, action: photoAction.SetPreviousPhoto): void {
    const photos = ctx.getState().photos;
    let index = photos.indexOf(ctx.getState().currentPhoto!);
    ctx.patchState({
      currentPhoto: photos[--index]
    });
  }

  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(photoAction.AddPhoto)
  addPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhoto): Observable<Subscription> {
    return this.photoService.create(action.photo, action.tags, action.created).pipe(
      map((photo: Photo) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.AddPhotoSuccess(photo))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.AddPhotoFail(error))
          )
        )
      )
    );
  }

  @Action(photoAction.AddPhotoSuccess)
  addPhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoSuccess): void {
    const state = ctx.getState();
    ctx.patchState({
      photos: [
        ...state.photos,
        action.photo,
      ], loaded: true, loading: false
    });
    this.alertService.success('Upload success');
  }

  @Action(photoAction.AddPhotoFail)
  addPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoFail): void {
    ctx.dispatch({loaded: false, loading: false});
    this.alertService.error('Upload fail');
  }

  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(photoAction.DeletePhoto)
  deletePhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhoto): Observable<Subscription> {
    return this.photoService.delete(action.id).pipe(
      // tap(console.log(action)),
      map((update: PhotoUpdate) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.DeletePhotoSuccess(update))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.DeletePhotoFail(error))
          )
        )
      )
    );
  }

  @Action(photoAction.DeletePhotoSuccess)
  deletePhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotoSuccess): void {
    ctx.setState(
      patch({
        photos: removeItem<Photo>(photo => photo!.id === action.photoUpdate.id)
      })
    );
  }

  @Action(photoAction.DeletePhotoFail)
  deletePhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotoFail): void {
    console.log(action.error)
    this.alertService.error('Delete fail');
  }

  //////////////////////////////////////////////////////////
  //          photos to compare
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoSelection)
  addToComparedPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoSelection): void {
    // const state = ctx.getState();
    const isSelected = !action.photo.isSelected;
    ctx.setState(
      patch({
        photos: updateItem<Photo>(action.photo.index, patch({isSelected: isSelected}))
      })
    );
  }

  @Action(photoAction.ClearPhotoSelection)
  clearComparedPhotos(ctx: StateContext<PhotoStateModel>): void {
    // TODO what a fucking solution!!! unfortunately there is no method like "updateMany"
    const comparePhotos = PhotoState.getComparePhotos(ctx.getState());
    for (let i = 0; i < comparePhotos.length; i++) {
      ctx.setState(
        patch({
          photos: updateItem<Photo>(photo => photo!.isSelected, patch({isSelected: false}))
        })
      );
    }
  }

  //////////////////////////////////////////////////////////
  //          download
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoDownload)
  toggleDownload(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoDownload): void {
    const downloads = ctx.getState().downloads;
    const isDownload = downloads.includes(action.photo);
    ctx.setState(
      patch({
        downloads:
          isDownload
            ? removeItem<Photo>(action.photo.index)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.SelectAllPhotos)
  selectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const state = ctx.getState();
    ctx.setState(
      patch({
        selectedPhotos: state.photos
      })
    );
  }

  @Action(photoAction.SelectManyPhotos)
  selectManyPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.SelectManyPhotos): void {
    ctx.setState(
      patch({
        selectedPhotos: action.photos
      })
    );
  }

  @Action(photoAction.DeselectAllPhotos)
  deselectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({
        selectedPhotos: photos // WTF !!! empty array thrown an error
      })
    );
  }

  @Action(photoAction.DeselectAllDownloads)
  deselectAllDownloads(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({
        downloads: photos // WTF !!! empty array thrown an error
      })
    );
  }

  @Action(photoAction.ToggleAllDownload)
  togglePhotosDownload(ctx: StateContext<PhotoStateModel>): void {
    const photos = ctx.getState().photos;
    const downloads = ctx.getState().downloads;
    const difference = photos.filter(x => !downloads.includes(x));
    ctx.setState(
      patch({downloads: difference})
    );
  }

  //////////////////////////////////////////////////////////
  //          tags
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetTagsOfPhoto)
  setTagsOfPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPhoto): Observable<Subscription> {
    const photo = ctx.getState().photos[action.photo.index];
    return this.photoService.updateTagsOfPhoto(action.photo.id, action.tags)
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.SetTagsOfPhotoSuccess(photo, action.tags))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.SetTagsOfPhotoFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.SetTagsOfPhotoSuccess)
  setTagsOfPhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPhotoSuccess): void {
    ctx.setState(
      patch({
        photos: updateItem<Photo>(action.photo.index, patch({tags: action.tags}))
      })
    );
  }

  @Action(photoAction.SetTagsOfPhotoFail)
  setTagsOfPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPhotoFail): void {
    this.alertService.error('Set tags fail');
    console.log(action.error)
  }

  // @Action(photoAction.AddTagsToPhoto)
  // addTagsToPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagsToPhoto): Observable<Subscription> {
  //   const photo = ctx.getState().photos[action.photo.index];
  //   const allTags: string[] = photo.tags.concat(action.tags);
  //   console.log('PhotoState addTagsToPhoto: ', allTags)
  //   return this.photoService.updateTagsOfPhoto(action.photo.id, allTags)
  //     .pipe(
  //       map((res: any) =>
  //         asapScheduler.schedule(() =>
  //           ctx.dispatch(new photoAction.AddTagsToPhotoSuccess(photo, allTags))
  //         )
  //       ),
  //       catchError(error =>
  //         of(
  //           asapScheduler.schedule(() =>
  //             ctx.dispatch(new photoAction.AddTagsToPhotoFail(error))
  //           )
  //         )
  //       )
  //     );
  // }
  //
  // @Action(photoAction.AddTagsToPhotoSuccess)
  // addTagsToPhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagsToPhotoSuccess): void {
  //   ctx.setState(
  //     patch({
  //       photos: updateItem<Photo>(action.photo.index, patch({tags: action.photo.tags}))
  //     })
  //   );
  // }
  //
  // @Action(photoAction.AddTagsToPhotoFail)
  // addTagsToPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagsToPhotoFail): void {
  //   this.alertService.error('Add tag fail');
  //   console.log(action.error)
  // }
  //
  // @Action(photoAction.RemoveTagsFromPhoto)
  // removeTagsFromPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagsFromPhoto): Observable<Subscription> {
  //   const photo = ctx.getState().photos[action.photo.index];
  //   const difference = photo.tags.filter(x => !action.tags.includes(x));
  //   return this.photoService.updateTagsOfPhoto(action.photo.id, difference)
  //     .pipe(
  //       map((res: any) =>
  //         asapScheduler.schedule(() =>
  //           ctx.dispatch(new photoAction.RemoveTagsFromPhotoSuccess(action.photo, difference))
  //         )
  //       ),
  //       catchError(error =>
  //         of(
  //           asapScheduler.schedule(() =>
  //             ctx.dispatch(new photoAction.RemoveTagsFromPhotoFail(error))
  //           )
  //         )
  //       )
  //     );
  // }
  //
  // @Action(photoAction.RemoveTagsFromPhotoSuccess)
  // removeTagsFromPhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagsFromPhotoSuccess): void {
  //   ctx.setState(
  //     patch({
  //       photos: updateItem<Photo>(action.photo.index, patch({tags: action.tags}))
  //     })
  //   );
  // }
  //
  // @Action(photoAction.RemoveTagsFromPhotoFail)
  // removeTagsFromPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagsFromPhotoFail): void {
  //   this.alertService.error('Remove tag fail');
  //   console.log(action.error)
  // }

  //////////////////////////////////////////////////////////
  //          rating
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetRating)
  setRating(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRating): Observable<Subscription> {
    return this.photoService.setRating(action.photo, action.rate).pipe(
      map((update: PhotoUpdate) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.SetRatingSuccess(action.photo, action.rate))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.SetRatingFail(error))
          )
        )
      )
    );
  }

  @Action(photoAction.SetRatingSuccess)
  setRatingSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRatingSuccess): void {
    ctx.setState(
      patch({
        photos: updateItem<Photo>(action.photo.index, patch({rating: action.rate})),
      })
    );
    ctx.setState(
      patch({
        currentPhoto: ctx.getState().photos[action.photo.index]
      })
    );
  }

  @Action(photoAction.SetRatingFail)
  setRatingFail(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRatingFail): void {
    console.log(action.error)
    this.alertService.error('Rating photo fail');
  }

  //////////////////////////////////////////////////////////
  //          filter
  //////////////////////////////////////////////////////////

  @Action(photoAction.AddTagFilter)
  addTagFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagFilter): void {
    ctx.setState(
      patch({
        tagFilter: append([action.filter])
      })
    );
  }

  @Action(photoAction.RemoveTagFilter)
  removeTagFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagFilter): void {
    ctx.setState(
      patch({
        tagFilter: removeItem<string>(name => name === action.filter)
      })
    );
  }

  @Action(photoAction.ClearTagFilter)
  clearTagFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.ClearTagFilter): void {
    ctx.patchState({tagFilter: []});
  }

  @Action(photoAction.SetRatingFilter)
  setRatingFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRatingFilter): void {
    ctx.patchState({
      filterRating: action.rate
    });
  }

  @Action(photoAction.SetFromYearFilter)
  setFromYearFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.SetFromYearFilter): void {
    ctx.patchState({
      filterFrom: action.year
    });
  }

  @Action(photoAction.SetToYearFilter)
  setToYearFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.SetToYearFilter): void {
    ctx.patchState({
      filterTo: action.year
    });
  }

  @Action(photoAction.ClearFilter)
  clearFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.ClearFilter): void {
    ctx.patchState({
      filterTo: -1, filterFrom: -1, filterRating: 0
    });
    // ctx.dispatch(new ClearTagFilter())
  }
}
