import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { append, insertItem, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { filterByRating, filterByTags, filterByYear } from "@gallery/store/photos/photo.tools";
import { AlertService } from "@app/common/services/alert.service";
import { PhotoService } from "@gallery/services/photo.service";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";
import { ServerSentService } from "@app/common/services/server-sent.service";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { Tag } from "@gallery/store/tags/tag.model";

export interface PhotoStateModel {
  photos: Photo[];
  filteredPhotos: Photo[];
  currentPhoto: Photo;
  currentIndex: number;
  editPhotos: Photo[];
  downloads: Photo[];
  comparePhotos: Photo[];
  loadedPhotos: number;
  availablePhotos: number;
  tagFilter: Tag[];
  filterRating: number;
  filterFrom: number;
  filterTo: number;
  newDataAvailable: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'PhotoState',
  defaults: {
    photos: [],
    filteredPhotos: [],
    comparePhotos: [],
    downloads: [],
    editPhotos: [],
    currentIndex: 0,
    currentPhoto: {id: '0', index: -1, tags: [], isPrivate: false, rating: 0, fileName: '', recordDate: new Date()},
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
  static getPhotosByTags(photos: Photo[], activeTags: Tag[]): Photo[] {
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
    // console.log('PhotoState getFilteredPhotos: ',)
    filteredPhotos = filterByYear(filteredPhotos, filterFrom, filterTo);
    return filteredPhotos;
  }

  @Selector()
  static getCurrentPhoto(state: PhotoStateModel): Photo {
    return state.photos[state.currentIndex];
  }

  @Selector()
  static getCurrentIndex(state: PhotoStateModel): number {
    return state.currentIndex;
  }

  @Selector()
  static getComparePhotos(state: PhotoStateModel): Photo[] {
    return state.comparePhotos;
  }

  @Selector()
  static getEditPhotos(state: PhotoStateModel): Photo[] {
    return state.editPhotos;
  }

  @Selector()
  static getAvailablePhotos(state: PhotoStateModel): number {
    return state.availablePhotos;
  }

  @Selector()
  static getActiveTags(state: PhotoStateModel): Tag[] {
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

  // region meta data
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
    // console.log('PhotoState loadMetaDataSuccess: ',)
    ctx.patchState({
      availablePhotos: action.dto.count, loading: false
    });
  }

  @Action(photoAction.LoadMetaDataFail)
  loadMetaDataFail(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataFail): void {
    ctx.dispatch({loaded: false, loading: false});
    this.alertService.error('load meta data fail');
  }

  // endregion

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
      currentIndex: action.photo.index
    });
  }

  @Action(photoAction.SetNextPhoto)
  setNextPhotoAction(ctx: StateContext<PhotoStateModel>): void {
    // todo check max
    let index = ctx.getState().currentIndex;
    ctx.patchState({
      currentIndex: ++index
    });
  }

  @Action(photoAction.SetPreviousPhoto)
  setPreviousPhotoAction(ctx: StateContext<PhotoStateModel>): void {
    // todo check min
    let index = ctx.getState().currentIndex;
    ctx.patchState({
      currentIndex: --index
    });
  }

  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(photoAction.AddPhoto)
  addPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhoto): Observable<Subscription> {
    return this.photoService.create(action.photo, action.user.id, action.tags, action.created, action.isPrivate).pipe(
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
      ],
    });
    this.alertService.success('Upload success');
  }

  @Action(photoAction.AddPhotoFail)
  addPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoFail): void {
    console.log(action.error)
    ctx.dispatch({loaded: false, loading: false});
    this.alertService.error('Upload fail');
  }

  //////////////////////////////////////////////////////////
  //          update
  //////////////////////////////////////////////////////////

  @Action(photoAction.UpdatePhoto)
  updatePhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.UpdatePhoto): Observable<Subscription> {
    // const photo = ctx.getState().photos[action.dto.index];
    return this.photoService.updatePhoto(action.photo.id, action.dto)
      .pipe(
        map((photo: Photo) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.UpdatePhotoSuccess(photo, action.photo.index))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.UpdatePhotoFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.UpdatePhotoSuccess)
  updatePhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.UpdatePhotoSuccess): void {
    const photo = action.photo;
    ctx.setState(
      patch({
        photos: updateItem<Photo>(action.index, patch({
          tags: photo.tags,
          isPrivate: photo.isPrivate
        }))
      })
    );
  }

  @Action(photoAction.UpdatePhotoFail)
  updatePhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.UpdatePhotoFail): void {
    this.alertService.error('Add tag fail');
    console.log(action.error)
  }

  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(photoAction.DeletePhoto)
  deletePhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhoto): Observable<Subscription> {
    return this.photoService.delete(action.id).pipe(
      // tap(console.log(action)),
      map((id: string) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.DeletePhotoSuccess(id))
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
        photos: removeItem<Photo>(photo => photo!.id === action.id)
      })
    );
  }

  @Action(photoAction.DeletePhotoFail)
  deletePhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotoFail): void {
    console.log(action.error)
    this.alertService.error('Delete fail');
  }

  // @Action(photoAction.DeletePhotos)
  // deletePhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotos): Observable<Subscription> {
  //   return this.photoService.deletePhotos(action.ids).pipe(
  //     // tap(console.log(action)),
  //     map((update: PhotoUpdate) =>
  //       asapScheduler.schedule(() =>
  //         ctx.dispatch(new photoAction.DeletePhotosSuccess(update))
  //       )
  //     ),
  //     catchError(error =>
  //       of(
  //         asapScheduler.schedule(() =>
  //           ctx.dispatch(new photoAction.DeletePhotosFail(error))
  //         )
  //       )
  //     )
  //   );
  // }
  //
  // @Action(photoAction.DeletePhotoSuccess)
  // deletePhotosSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotosSuccess): void {
  //   ctx.setState(
  //     patch({
  //       photos: removeItem<Photo>(photo => photo!.id === action.photoUpdate.id)
  //     })
  //   );
  // }
  //
  // @Action(photoAction.DeletePhotoFail)
  // deletePhotosFail(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotosFail): void {
  //   console.log(action.error)
  //   this.alertService.error('Delete fail');
  // }

  //////////////////////////////////////////////////////////
  //          photos to compare
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoComparison)
  togglePhotoComparison(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoComparison): void {
    const contains = ctx.getState().comparePhotos.includes(action.photo);
    ctx.setState(
      patch({
        comparePhotos:
          contains
            ? removeItem<Photo>(photo => photo?.index === action.photo.index)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.ClearPhotoComparison)
  clearPhotoComparison(ctx: StateContext<PhotoStateModel>): void {
    ctx.patchState({
      comparePhotos: [],
    });
  }

  //////////////////////////////////////////////////////////
  //          manage
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoGroupEdit)
  toggleGroupEdit(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoGroupEdit): void {
    const contains = ctx.getState().editPhotos.includes(action.photo);
    console.log('PhotoState toggleGroupEdit: ', action.photo, contains)
    ctx.setState(
      patch({
        editPhotos:
          contains
            ? removeItem<Photo>(photo => photo?.index === action.photo.index)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.SelectAllPhotosEdit)
  selectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const state = ctx.getState();
    ctx.setState(
      patch({
        editPhotos: state.photos
      })
    );
  }

  @Action(photoAction.SelectManyPhotosEdit)
  selectManyPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.SelectManyPhotosEdit): void {
    ctx.setState(
      patch({
        editPhotos: action.photos
      })
    );
  }

  @Action(photoAction.DeselectAllPhotosEdit)
  deselectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({
        editPhotos: photos // WTF !!! empty array thrown an error
      })
    );
  }

  //////////////////////////////////////////////////////////
  //          download
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoDownload)
  toggleDownload(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoDownload): void {
    const isDownload = ctx.getState().downloads.includes(action.photo);
    ctx.setState(
      patch({
        downloads:
          isDownload
            ? removeItem<Photo>(photo => photo?.index === action.photo.index)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.SelectAllDownloads)
  selectAllDownload(ctx: StateContext<PhotoStateModel>): void {
    const filteredPhotos = this._getFilteredPhotos(ctx.getState());
    ctx.setState(patch({downloads: filteredPhotos}));
  }

  @Action(photoAction.AddToDownload)
  addToDownload(ctx: StateContext<PhotoStateModel>, action: photoAction.AddToDownload): void {
    const state = ctx.getState();
    const photos: Photo[] = [...state.downloads, ...action.photos]
    ctx.setState(patch({downloads: photos}));
  }

  @Action(photoAction.DeselectAllDownloads)
  deselectAllDownloads(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({downloads: photos}) // WTF !!! empty array thrown an error
    );
  }

  @Action(photoAction.ToggleAllDownload)
  togglePhotosDownload(ctx: StateContext<PhotoStateModel>): void {
    const filteredPhotos = this._getFilteredPhotos(ctx.getState());
    const downloads = ctx.getState().downloads;
    const difference = filteredPhotos.filter(x => !downloads.includes(x));
    ctx.setState(
      patch({downloads: difference})
    );
  }

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
        tagFilter: removeItem<Tag>(name => name === action.filter)
      })
    );
  }

  @Action(photoAction.SetRatingFilter)
  setRatingFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRatingFilter): void {
    if (action.rate === ctx.getState().filterRating) {
      action.rate = 0;
    }
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
  clearFilter(ctx: StateContext<PhotoStateModel>): void {
    ctx.patchState({
      filterTo: -1, filterFrom: -1, filterRating: 0, tagFilter: []
    });
  }

  // Helper. Look for better solution when ngxs updates

  _getFilteredPhotos(state: PhotoStateModel): Photo[] {
    return PhotoState.getFilteredPhotos(
      PhotoState.getPhotosByTags(PhotoState.getPhotos(state), PhotoState.getActiveTags(state)),
      PhotoState.getFilterRating(state),
      PhotoState.getFilterFrom(state),
      PhotoState.getFilterTo(state));
  }
}
