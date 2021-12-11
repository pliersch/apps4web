import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {PhotoModel} from "@gallery/store/photos/photo-model";
import {PhotoService} from "@gallery/store/photos/photo.service";
import {catchError, map} from "rxjs/operators";
import {asapScheduler, Observable, of, Subscription} from "rxjs";
import * as photoAction from "@gallery/store/photos/photo-actions";

export interface PhotoStateModel {
  photos: PhotoModel[];
  selectedPhoto: PhotoModel | null;
  allPhotosLoaded: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'gallery',
  defaults: {
    photos: [],
    selectedPhoto: null,
    allPhotosLoaded: false,
    loaded: false,
    loading: false
  }
})

@Injectable()
export class PhotoState {

  @Selector()
  static getPhotos(state: PhotoStateModel): PhotoModel[] {
    return state.photos;
  }

  @Selector()
  static selectedPhotos(state: PhotoStateModel): PhotoModel[] {
    // TODO <> untersuchen / verstehen
    return <PhotoModel[]>state.photos;
  }

  // @Selector()
  // static selectedPhoto(state: PhotoStateModel): PhotoModel {
  //   // TODO <> untersuchen / verstehen
  //   return <PhotoModel>state.selectedPhoto;
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
        map((photos: PhotoModel[]) =>
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
      )
      ;
  }

  @Action(photoAction.LoadPhotosSuccessAction)
  loadPhotosSuccess({patchState}: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosSuccessAction): void {
    patchState({photos: action.photos, loaded: true, loading: false});
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
        map((photos: PhotoModel[]) =>
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
      )
      ;
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
}
