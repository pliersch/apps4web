import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {PhotoService} from "@app/core/services/photo.service";
import {catchError, map} from "rxjs/operators";
import {asapScheduler, Observable, of, Subscription} from "rxjs";
import * as photoAction from "@gallery/store/photos/photo-actions";
import {Photo} from "@gallery/store/photos/photo.model";

export interface PhotoStateModel {
  photos: Photo[];
  selectedPhoto: Photo | null;
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
  static getPhotos(state: PhotoStateModel): Photo[] {
    return state.photos;
  }

  @Selector()
  static getSelectedPhotos(state: PhotoStateModel): Photo[] {
    return state.photos.filter(photo => photo.isSelected);
  }

  // @Selector()
  // static selectedPhoto(state: PhotoStateModel): Photo {
  //   return <Photo>state.selectedPhoto;
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

  //////////////////////////////////////////////////////////
  //          selected photos
  //////////////////////////////////////////////////////////

}
