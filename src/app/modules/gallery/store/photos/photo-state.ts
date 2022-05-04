import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {PhotoService} from "@app/core/services/photo.service";
import {catchError, map} from "rxjs/operators";
import {asapScheduler, Observable, of, Subscription} from "rxjs";
import * as photoAction from "@gallery/store/photos/photo-actions";
import {Photo} from "@gallery/store/photos/photo.model";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {filterAllTags} from "@gallery/store/photos/photo.tools";
import {TagState} from "@gallery/store/tags/tag-state";

export interface PhotoStateModel {
  photos: Photo[];
  // thumbs: Photo[];
  selectedPictures: Photo[];
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
    selectedPictures: [],
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
  static getSelectedPictures(state: PhotoStateModel): Photo[] {
    return state.selectedPictures;
  }

  // @Selector(/*[PhotoState]*/)
  // static getDownloads(state: PhotoStateModel): Photo[] {
  //   return state.photos.filter(photo => photo.download);
  // }

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
    let downloads = ctx.getState().selectedPictures;
    let isDownload = downloads.includes(action.photo);
    ctx.setState(
      patch({
        selectedPictures:
          isDownload
            ? removeItem<Photo>(photo => photo!.id === action.photo.id)
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

  // @Action(photoAction.AddManyPhotosAction)
  // addManyPhotosAction(ctx: StateContext<PhotoStateModel>): void {
  //   const state = ctx.getState();
  //   ctx.setState(
  //     patch({
  //       downloads: state.photos
  //     })
  //   );
  // }

  @Action(photoAction.DeselectAllPhotosAction)
  deselectAllPhotos(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = [];
    ctx.setState(
      patch({
        selectedPictures: photos // WTF !!! empty array thrown an error
      })
    );
  }

  @Action(photoAction.TogglePhotosDownloadAction)
  togglePhotosDownload(ctx: StateContext<PhotoStateModel>): void {
    console.log('togglePhotosDownloadAction!')
    let photos = ctx.getState().photos;
    let downloads = ctx.getState().selectedPictures;
    let difference = photos.filter(x => !downloads.includes(x));
    ctx.setState(
      patch({selectedPictures: difference})
    );
  }

  //////////////////////////////////////////////////////////
  //          tags
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetTagsOfPicture)
  setTagsOfPicture(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPicture): Observable<Subscription> {
    return this.photoService.updateTagsOfPicture(action.photo.id, action.tags)
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.AddTagToPictureSuccess({id: action.photo.id, tags: action.tags}))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.AddTagToPictureFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.SetTagsOfPictureSuccess)
  setTagsOfPictureSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPictureSuccess): void {
    ctx.setState(
      patch({
        photos: updateItem<Photo>(photo => photo!.id === action.update.id,
          patch({tags: action.update.tags}))
      })
    );
  }

  @Action(photoAction.SetTagsOfPictureFail)
  setTagsOfPictureFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.SetTagsOfPictureFail): void {
    // TODO handle error!
    console.log(action.error)
    // dispatch({loaded: false, loading: false});
  }

  @Action(photoAction.AddTagToPicture)
  addTagToPicture(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagToPicture): Observable<Subscription> {
    let photo = ctx.getState().photos.find(photo => photo.id === action.photo.id);
    const allTags: string[] = photo!.tags.concat(action.tag);
    return this.photoService.updateTagsOfPicture(action.photo.id, allTags)
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.AddTagToPictureSuccess({id: action.photo.id, tags: allTags}))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.AddTagToPictureFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.AddTagToPictureSuccess)
  addTagToPictureSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.AddTagToPictureSuccess): void {
    ctx.setState(
      patch({
        photos: updateItem<Photo>(photo => photo!.id === action.update.id,
          patch({tags: action.update.tags}))
      })
    );
  }

  @Action(photoAction.AddTagToPictureFail)
  addTagToPictureFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.AddTagToPictureFail): void {
    // TODO handle error!
    console.log(action.error)
    // dispatch({loaded: false, loading: false});
  }

  @Action(photoAction.RemoveTagFromPicture)
  removeTagFromPicture(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagFromPicture): Observable<Subscription> {
    let photo = ctx.getState().photos.find(photo => photo.id === action.photo.id);
    let difference = photo!.tags.filter(item => item !== action.tag);
    return this.photoService.updateTagsOfPicture(action.photo.id, difference)
      .pipe(
        map((res: any) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.AddTagToPictureSuccess({id: action.photo.id, tags: difference}))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new photoAction.AddTagToPictureFail(error))
            )
          )
        )
      );
  }

  @Action(photoAction.RemoveTagFromPictureSuccess)
  removeTagFromPictureSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.RemoveTagFromPictureSuccess): void {
    ctx.setState(
      patch({
        photos: updateItem<Photo>(photo => photo!.id === action.update.id,
          patch({tags: action.update.tags}))
      })
    );
  }

  @Action(photoAction.RemoveTagFromPictureFail)
  removeTagFromPictureFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.RemoveTagFromPictureFail): void {
    // TODO handle error!
    console.log(action.error)
    // dispatch({loaded: false, loading: false});
  }
}
