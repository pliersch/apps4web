import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { insertItem, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { filterByRating, filterByTags, filterByYear } from "@gallery/store/photos/photo.tools";
import { TagState } from "@gallery/store/tags/tag.state";
import { AlertService } from "@app/services/alert.service";
import { PhotoService } from "@gallery/services/photo.service";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";

export interface PhotoStateModel {
  photos: Photo[];
  selectedPictures: Photo[];
  downloads: Photo[];
  tagFilter: string[];
  filterRating: number;
  filterFrom: number,
  filterTo: number,
  allPhotosCount: number;
  loadedPhotosCount: number,
  selectedPhotosCount: number;
  filteredPhotosCount: number;
  // comparePhotos: Photo[];
  // exportPhotos: Photo[];
  currentPhoto: Photo;
  allPhotosLoaded: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'photos', // todo maybe photos?
  defaults: {
    photos: [],
    downloads: [],
    selectedPictures: [],
    currentPhoto: {id: '0', index: -1, tags: [], rating: 0, isSelected: false, fileName: '', recordDate: new Date()},
    allPhotosCount: 0,
    loadedPhotosCount: 0,
    selectedPhotosCount: 0,
    filteredPhotosCount: 0,
    tagFilter: [],
    filterRating: 0,
    filterFrom: -1,
    filterTo: -1,
    allPhotosLoaded: false,
    loaded: false,
    loading: false,
  }
})

@Injectable()
export class PhotoState {

  constructor(private photoService: PhotoService,
              private alertService: AlertService) {
  }

  @Selector()
  static getPhotos(state: PhotoStateModel): Photo[] {
    return state.photos;
  }

  @Selector([PhotoState.getPhotos, TagState.getActiveTags])
  static getPhotosByTags(photos: Photo[], activeTags: string[]): Photo[] {
    if (activeTags.length == 0) {
      return photos;
    }
    return filterByTags(photos, activeTags);
  }

  @Selector([PhotoState.getPhotosByTags, PhotoState.getFilterRating, PhotoState.getFilterFrom, PhotoState.getFilterTo])
  static getFilteredPhotos(photos: Photo[], filterRating: number, filterFrom: number, filterTo: number): Photo[] {
    let filteredPhotos = filterByRating(photos, filterRating);
    console.log('PhotoState getFilteredPhotos: ', filterFrom, filterTo)
    if (filterFrom > -1 || filterTo > -1) {
      filteredPhotos = filterByYear(filteredPhotos, filterFrom, filterTo);
    }
    return filteredPhotos;
  }

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
  static getSelectedPictures(state: PhotoStateModel): Photo[] {
    return state.selectedPictures;
  }

  @Selector()
  static getAllPhotosCount(state: PhotoStateModel): number {
    return state.allPhotosCount;
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
    return state.downloads
  }

  // @Selector([PhotoState])
  // isDataSelected(state: PhotoStateModel): (photo: Photo) => boolean {
  //   return (photo: Photo) => state.downloads.includes(photo);
  // }

  //////////////////////////////////////////////////////////
  //          meta data
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadMetaDataAction)
  loadMetaData(ctx: StateContext<PhotoStateModel>): Observable<void> {
    ctx.patchState({loading: true});
    return this.photoService.loadMetaData().pipe(tap((metaDto) => {
        ctx.patchState({
          allPhotosCount: metaDto.count, loading: false
        })
        console.log('Inside of load',)
      }),
      mergeMap(() => {
        console.log("Inside of mergeMap")
        return ctx.dispatch(new photoAction.LoadMetaDataSuccessAction({count: 4}))
      }),
      catchError(err => {
          console.log("Inside of catchError")
          return ctx.dispatch(new photoAction.LoadMetaDataFailAction(err))
        }
      ))
  }

  // @Action(photoAction.LoadMetaDataAction)
  // loadMetaData(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataAction): Observable<Subscription> {
  //   return this.photoService.loadMetaData().pipe(
  //     map((metaDto: PhotoMetaDataDto) =>
  //       asapScheduler.schedule(() =>
  //         ctx.dispatch(new photoAction.LoadMetaDataSuccessAction(metaDto))
  //       )
  //     ),
  //     catchError(error =>
  //       of(
  //         asapScheduler.schedule(() =>
  //           ctx.dispatch(new photoAction.LoadMetaDataFailAction(error))
  //         )
  //       )
  //     )
  //   );
  // }
  //
  // @Action(photoAction.LoadMetaDataSuccessAction)
  // loadMetaDataSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataSuccessAction): void {
  //   ctx.patchState({
  //     allPhotosCount: action.dto.count, loading: false
  //   });
  // }
  //
  // @Action(photoAction.LoadMetaDataFailAction)
  // loadMetaDataFail(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataFailAction): void {
  //   ctx.dispatch({loaded: false, loading: false});
  //   this.alertService.error('load meta data fail');
  // }

  // region loading
  //////////////////////////////////////////////////////////
  //          load photos
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadPhotosAction)
  loadPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosAction): Observable<Subscription> {
    const state = ctx.getState();
    if (state.loading) {
      return of(Subscription.EMPTY);
    }
    ctx.patchState({loading: true, loaded: false});
    const from: number = action.from ? action.from : state.photos.length;
    const availablePhotos: number = state.allPhotosCount - state.photos.length;
    const count: number = availablePhotos < action.count ? availablePhotos : action.count;
    if (count == 0) {
      return of(Subscription.EMPTY);
    }
    return this.photoService.getPhotos(count, from)
      .pipe(
        map((dto: PhotoDto) =>
          asapScheduler.schedule(() => {
              ctx.dispatch(new photoAction.LoadPhotosSuccessAction(dto))
            }
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.LoadPhotosFailAction(error))
            )
          )
        )
      );
  }

  @Action(photoAction.LoadPhotosSuccessAction)
  loadPhotosSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosSuccessAction): void {
    const state = ctx.getState();
    let index = state.loadedPhotosCount;
    for (const photo of action.dto.photos) {
      photo.recordDate = new Date(Number(photo.recordDate));
      photo.index = index++;
    }
    const photos: Photo[] = [...state.photos, ...action.dto.photos]
    ctx.patchState({
      loadedPhotosCount: index,
      photos: photos, loaded: true, loading: false, currentPhoto: photos[0]
    });
  }

  @Action(photoAction.LoadPhotosFailAction)
  loadPhotosFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosFailAction): void {
    this.alertService.error('Load photos fail');
    dispatch({loaded: false, loading: false});
  }

  // endregion

  //////////////////////////////////////////////////////////
  //          set current
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetCurrentPhotoAction)
  setCurrentPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.SetCurrentPhotoAction): void {
    ctx.patchState({
      currentPhoto: action.photo
    });
  }

  @Action(photoAction.SetNextPhotoAction)
  setNextPhotoAction(ctx: StateContext<PhotoStateModel>, action: photoAction.SetNextPhotoAction): void {
    const photos = ctx.getState().photos;
    let index = photos.indexOf(ctx.getState().currentPhoto!);
    ctx.patchState({
      currentPhoto: photos[++index]
    });
  }

  @Action(photoAction.SetPreviousPhotoAction)
  setPreviousPhotoAction(ctx: StateContext<PhotoStateModel>, action: photoAction.SetPreviousPhotoAction): void {
    const photos = ctx.getState().photos;
    let index = photos.indexOf(ctx.getState().currentPhoto!);
    ctx.patchState({
      currentPhoto: photos[--index]
    });
  }

  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(photoAction.AddPhotoAction)
  addPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoAction): Observable<Subscription> {
    return this.photoService.create(action.photo, action.tags, action.created).pipe(
      map((photo: Photo) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.AddPhotoSuccessAction(photo))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.AddPhotoFailAction(error))
          )
        )
      )
    );
  }

  @Action(photoAction.AddPhotoSuccessAction)
  addPhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoSuccessAction): void {
    const state = ctx.getState();
    ctx.patchState({
      photos: [
        ...state.photos,
        action.photo,
      ], loaded: true, loading: false
    });
    this.alertService.success('Upload success');
  }

  @Action(photoAction.AddPhotoFailAction)
  addPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoFailAction): void {
    ctx.dispatch({loaded: false, loading: false});
    this.alertService.error('Upload fail');
  }

  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(photoAction.DeletePhotoAction)
  deletePhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotoAction): Observable<Subscription> {
    return this.photoService.delete(action.id).pipe(
      // tap(console.log(action)),
      map((update: PhotoUpdate) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.DeletePhotoSuccessAction(update))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.DeletePhotoFailAction(error))
          )
        )
      )
    );
  }

  @Action(photoAction.DeletePhotoSuccessAction)
  deletePhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotoSuccessAction): void {
    ctx.setState(
      patch({
        photos: removeItem<Photo>(photo => photo!.id === action.photoUpdate.id)
      })
    );
  }

  @Action(photoAction.DeletePhotoFailAction)
  deletePhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotoFailAction): void {
    console.log(action.error)
    this.alertService.error('Delete fail');
  }

  //////////////////////////////////////////////////////////
  //          photos to compare
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoSelectionAction)
  addToComparedPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoSelectionAction): void {
    // const state = ctx.getState();
    const isSelected = !action.photo.isSelected;
    ctx.setState(
      patch({
        photos: updateItem<Photo>(action.photo.index, patch({isSelected: isSelected}))
      })
    );
  }

  @Action(photoAction.ClearPhotoSelectionAction)
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

  @Action(photoAction.TogglePhotoDownloadAction)
  toggleDownload(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoDownloadAction): void {
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

  @Action(photoAction.SelectAllPhotosAction)
  selectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const state = ctx.getState();
    ctx.setState(
      patch({
        selectedPictures: state.photos
      })
    );
  }

  @Action(photoAction.SelectManyPhotosAction)
  selectManyPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.SelectManyPhotosAction): void {
    ctx.setState(
      patch({
        selectedPictures: action.photos
      })
    );
  }

  @Action(photoAction.DeselectAllPhotosAction)
  deselectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({
        selectedPictures: photos // WTF !!! empty array thrown an error
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

  @Action(photoAction.ToggleAllDownloadAction)
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

  @Action(photoAction.SetTagsOfPicture)
  setTagsOfPicture(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPicture): Observable<Subscription> {
    const photo = ctx.getState().photos[action.photo.index];
    return this.photoService.updateTagsOfPicture(action.photo.id, action.tags)
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.SetTagsOfPictureSuccess(photo, action.tags))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.SetTagsOfPictureFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.SetTagsOfPictureSuccess)
  setTagsOfPictureSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPictureSuccess): void {
    ctx.setState(
      patch({
        photos: updateItem<Photo>(action.photo.index, patch({tags: action.tags}))
      })
    );
  }

  @Action(photoAction.SetTagsOfPictureFail)
  setTagsOfPictureFail(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPictureFail): void {
    this.alertService.error('Set tags fail');
    console.log(action.error)
  }

  // @Action(photoAction.AddTagsToPicture)
  // addTagsToPicture(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagsToPicture): Observable<Subscription> {
  //   const photo = ctx.getState().photos[action.photo.index];
  //   const allTags: string[] = photo.tags.concat(action.tags);
  //   console.log('PhotoState addTagsToPicture: ', allTags)
  //   return this.photoService.updateTagsOfPicture(action.photo.id, allTags)
  //     .pipe(
  //       map((res: any) =>
  //         asapScheduler.schedule(() =>
  //           ctx.dispatch(new photoAction.AddTagsToPictureSuccess(photo, allTags))
  //         )
  //       ),
  //       catchError(error =>
  //         of(
  //           asapScheduler.schedule(() =>
  //             ctx.dispatch(new photoAction.AddTagsToPictureFail(error))
  //           )
  //         )
  //       )
  //     );
  // }
  //
  // @Action(photoAction.AddTagsToPictureSuccess)
  // addTagsToPictureSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagsToPictureSuccess): void {
  //   ctx.setState(
  //     patch({
  //       photos: updateItem<Photo>(action.photo.index, patch({tags: action.photo.tags}))
  //     })
  //   );
  // }
  //
  // @Action(photoAction.AddTagsToPictureFail)
  // addTagsToPictureFail(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagsToPictureFail): void {
  //   this.alertService.error('Add tag fail');
  //   console.log(action.error)
  // }
  //
  // @Action(photoAction.RemoveTagsFromPicture)
  // removeTagsFromPicture(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagsFromPicture): Observable<Subscription> {
  //   const photo = ctx.getState().photos[action.photo.index];
  //   const difference = photo.tags.filter(x => !action.tags.includes(x));
  //   return this.photoService.updateTagsOfPicture(action.photo.id, difference)
  //     .pipe(
  //       map((res: any) =>
  //         asapScheduler.schedule(() =>
  //           ctx.dispatch(new photoAction.RemoveTagsFromPictureSuccess(action.photo, difference))
  //         )
  //       ),
  //       catchError(error =>
  //         of(
  //           asapScheduler.schedule(() =>
  //             ctx.dispatch(new photoAction.RemoveTagsFromPictureFail(error))
  //           )
  //         )
  //       )
  //     );
  // }
  //
  // @Action(photoAction.RemoveTagsFromPictureSuccess)
  // removeTagsFromPictureSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagsFromPictureSuccess): void {
  //   ctx.setState(
  //     patch({
  //       photos: updateItem<Photo>(action.photo.index, patch({tags: action.tags}))
  //     })
  //   );
  // }
  //
  // @Action(photoAction.RemoveTagsFromPictureFail)
  // removeTagsFromPictureFail(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagsFromPictureFail): void {
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
  }

  @Action(photoAction.SetRatingFail)
  setRatingFail(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRatingFail): void {
    console.log(action.error)
    this.alertService.error('Rating photo fail');
  }

  //////////////////////////////////////////////////////////
  //          set rating filter
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetRatingFilter)
  setRatingFilter(ctx: StateContext<PhotoStateModel>, action: photoAction.SetRatingFilter): void {
    ctx.patchState({
      filterRating: action.rate
    });
  }

  //////////////////////////////////////////////////////////
  //          set year filter
  //////////////////////////////////////////////////////////

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
}
