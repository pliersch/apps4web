import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {PhotoModel} from "@gallery/store/photos/photo-model";
import {PhotoService} from "@gallery/store/photos/photo.service";
import {catchError, map} from "rxjs/operators";
import {asapScheduler, of} from "rxjs";
import * as photoAction from "@gallery/store/photos/photo-actions";

export interface PhotoStateModel {
  photos: PhotoModel[];
  allPhotosLoaded: boolean;
  selectedPhoto: PhotoModel | null;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'gallery',
  defaults: {
    photos: [],
    selectedPhoto: null,
    allPhotosLoaded: false,
    loaded: true,
    loading: false
  }
})

@Injectable()
export class PhotoState {

  @Selector()
  static getPhotos(state: PhotoStateModel) {
    return state.photos;
  }

  @Selector()
  static selectedPhoto(state: PhotoStateModel): PhotoModel {
    // TODO <> untersuchen / verstehen
    return <PhotoModel>state.selectedPhoto;
  }

  constructor(private photoService: PhotoService) {
  }

  @Action(photoAction.LoadPhotosAction)
  loadPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosAction) {
    // TODO implement!
    // ctx.patchState({loading: true});
    return this.photoService.getAll()
      .pipe(
        map((photos: PhotoModel[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.LoadPhotosSuccessAction({photos}))
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
  loadPizzasSuccess(
    {patchState}: StateContext<PhotoStateModel>,
    {payload}: photoAction.LoadPhotosSuccessAction
  ) {
    patchState({photos: payload.photos, loaded: true, loading: false});
  }

  @Action(photoAction.LoadPhotosFailAction)
  loadPizzasFail(
    {dispatch}: StateContext<PhotoStateModel>,
    {payload}: photoAction.LoadPhotosFailAction
  ) {
    dispatch({loaded: false, loading: false});
  }

  @Action(photoAction.AddPhotoAction)
  addPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoAction) {

  }

}
