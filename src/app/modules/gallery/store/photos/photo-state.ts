import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {PhotoService} from "@app/core/services/photo.service";
import {catchError, map} from "rxjs/operators";
import {asapScheduler, Observable, of, Subscription} from "rxjs";
import * as photoAction from "@gallery/store/photos/photo-actions";
import {Photo} from "@gallery/store/photos/photo.model";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {filterAllTags} from "@gallery/store/photos/photo.tools";
import {TagState} from "@gallery/store/tags/tag-state";
import {AddManyPhotosAction, SelectManyPhotosAction} from "@gallery/store/photos/photo-actions";

export interface PhotoStateModel {
  photos: Photo[];
  // thumbs: Photo[];
  downloads: Photo[];
  tagFilter: string[];
  // comparePhotos: Photo[];
  // exportPhotos: Photo[];
  // selectedPhoto: Photo | null;
  allPhotosLoaded: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'gallery',
  defaults: {
    photos: [],
    // thumbs: [],
    downloads: [],
    tagFilter: [],
    allPhotosLoaded: false,
    loaded: false,
    loading: false,
  }
})

@Injectable()
export class PhotoState {

  @Selector([TagState.getActiveTags])
  static getPhotos(state: PhotoStateModel, activeTags: string[]): Photo[] {
    if (activeTags.length == 0) {
      return state.photos;
    }
    return filterAllTags(state.photos, activeTags);
  }

  @Selector()
  static getComparePhotos(state: PhotoStateModel): Photo[] {
    return state.photos.filter(photo => photo.isSelected);
  }

  @Selector(/*[PhotoState]*/)
  static downloads(state: PhotoStateModel): Photo[] {
    return state.downloads;
  }

  @Selector(/*[PhotoState]*/)
  static getDownloads(state: PhotoStateModel): Photo[] {
    return state.photos.filter(photo => photo.download);
  }

  // @Selector()
  // static getFilteredUsersFn(photoStateModel: PhotoStateModel) {
  //   return (filter: string) =>
  //     photoStateModel.photos.filter((photo) => photo.id != filter);
  // }
  //
  // @Selector([PhotoState])
  // isDataSelected(state: PhotoStateModel): (photo: Photo) => boolean {
  //   return (photo: Photo) => state.downloads.includes(photo);
  // }

  constructor(private photoService: PhotoService) {
  }

  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadPhotosAction)
  loadPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosAction): Observable<Subscription> {
    ctx.patchState({loading: true});
    return this.photoService.getAll()
      .pipe(
        map((photos: Photo[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.LoadPhotosSuccessAction(photos))
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
  loadPhotosSuccess({patchState}: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosSuccessAction): void {
    let photos: Photo[] = [];
    for (const photo of action.photos) {
      photos.push(photo)
    }
    patchState({photos: photos, loaded: true, loading: false});
  }

  @Action(photoAction.LoadPhotosFailAction)
  loadPhotosFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosFailAction): void {
    // TODO handle error!
    console.log(action.error)
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  // FIXME wrong actions!!! LoadPhotosSuccessAction LoadPhotosFailAction

  @Action(photoAction.AddPhotoAction)
  addPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoAction): Observable<Subscription> {
    return this.photoService.getAll()
      .pipe(
        map((photos: Photo[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.LoadPhotosSuccessAction(photos))
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

  @Action(photoAction.AddPhotoSuccessAction)
  addPhotoSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoSuccessAction): void {
    const state = ctx.getState();
    ctx.patchState({
      photos: [
        ...state.photos,
        action.photo,
      ], loaded: true, loading: false
    });
  }

  @Action(photoAction.AddPhotoFailAction)
  addPhotoFail(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoFailAction): void {
    // TODO handle error!
    console.log(action.error)
    ctx.dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          photos to compare
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoSelectionAction)
  addToComparedPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoSelectionAction): void {
    // const state = ctx.getState();
    let isSelected = !action.photo.isSelected;
    ctx.setState(
      patch({
        photos: updateItem<Photo>(photo => photo!.id === action.photo.id, patch({isSelected: isSelected}))
      })
    );
  }

  @Action(photoAction.ClearPhotoSelectionAction)
  clearComparedPhotos(ctx: StateContext<PhotoStateModel>): void {
    // TODO what a fucking solution!!! unfortunately there is no method like "updateMany"
    let comparePhotos = PhotoState.getComparePhotos(ctx.getState());
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
    console.log('PhotoState toggleDownload: ', action.photo)
    let downloads = ctx.getState().downloads;
    let isDownload = downloads.includes(action.photo);
    ctx.setState(
      patch({
        downloads:
          isDownload
            ? removeItem<Photo>(photo => photo!.id === action.photo.id)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.SelectAllPhotosAction)
  selectAllPhotosAction(ctx: StateContext<PhotoStateModel>): void {
    const state = ctx.getState();
    ctx.setState(
      patch({
        downloads: state.photos
      })
    );
  }

  @Action(photoAction.SelectManyPhotosAction)
  selectManyPhotosAction(ctx: StateContext<PhotoStateModel>, action: photoAction.SelectManyPhotosAction): void {
    ctx.setState(
      patch({
        downloads: action.photos
      })
    );
  }

  @Action(photoAction.AddManyPhotosAction)
  addManyPhotosAction(ctx: StateContext<PhotoStateModel>): void {
    const state = ctx.getState();
    ctx.setState(
      patch({
        downloads: state.photos
      })
    );
  }

  @Action(photoAction.DeselectAllPhotosAction)
  deselectAllPhotosAction(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({
        downloads: photos // WTF !!! empty array thrown an error
      })
    );
  }

  @Action(photoAction.TogglePhotosDownloadAction)
  togglePhotosDownloadAction(ctx: StateContext<PhotoStateModel>): void {
    console.log('togglePhotosDownloadAction!')
    let photos = ctx.getState().photos;
    let downloads = ctx.getState().downloads;
    let difference = photos.filter(x => !downloads.includes(x));
    ctx.setState(
      patch({
        downloads: difference
      })
    );
  }
}
