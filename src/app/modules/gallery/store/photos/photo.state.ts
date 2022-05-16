import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { insertItem, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { filterAllTags } from "@gallery/store/photos/photo.tools";
import { TagState } from "@gallery/store/tags/tag.state";
import { AlertService } from "@app/services/alert.service";
import { PhotoService } from "@gallery/services/photo.service";
import { PageDto } from "@app/common/dto/page.dto";
import { PageMetaDto } from "@app/common/dto/page-meta.dto";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";

export interface PhotoStateModel {
  photos: Photo[];
  selectedPictures: Photo[];
  pageMeta: PhotoMetaDataDto | null;
  tagFilter: string[];
  // comparePhotos: Photo[];
  // exportPhotos: Photo[];
  // selectedPhoto: Photo | null;
  allPhotosLoaded: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'gallery', // todo maybe photos?
  defaults: {
    photos: [],
    pageMeta: null,
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

  @Selector()
  static getSelectedPictures(state: PhotoStateModel): Photo[] {
    return state.selectedPictures;
  }

  @Selector()
  static getPageMetaData(state: PhotoStateModel): PhotoMetaDataDto | null {
    return state.pageMeta;
  }

  // @Selector()
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

  constructor(private photoService: PhotoService,
              private alertService: AlertService) {
  }

  //////////////////////////////////////////////////////////
  //          meta data
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadMetaDataAction)
  loadMetaData(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataAction): Observable<Subscription> {
    return this.photoService.loadMetaData().pipe(
      map((metaDto: PhotoMetaDataDto) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.LoadMetaDataSuccessAction(metaDto))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.LoadMetaDataFailAction(error))
          )
        )
      )
    );
  }

  @Action(photoAction.LoadMetaDataSuccessAction)
  loadMetaDataSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataSuccessAction): void {
    ctx.patchState({
      pageMeta: action.dto, loading: false
    });
    this.alertService.success('load meta data success: ' + action.dto.count);
  }

  @Action(photoAction.LoadMetaDataFailAction)
  loadMetaDataFail(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadMetaDataFailAction): void {
    ctx.dispatch({loaded: false, loading: false});
    this.alertService.error('load meta data fail');
  }

  //////////////////////////////////////////////////////////
  //          load photos
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadPhotosAction)
  loadPhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosAction): Observable<Subscription> {
    console.log('meta', ctx.getState().pageMeta)
    const state = ctx.getState();
    if (state.loading) {
      return of(Subscription.EMPTY);
    }
    ctx.patchState({loading: true, loaded: false});
    return this.photoService.getPage(action.dto)
      .pipe(
        map((dto: PageDto<Photo>) =>
          asapScheduler.schedule(() => {
              console.log('dto!!! ', dto)
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
    let photos: Photo[] = [...state.photos, ...action.dto.data]
    ctx.patchState({
      photos: photos, loaded: true, loading: false
    });
  }

  @Action(photoAction.LoadPhotosFailAction)
  loadPhotosFail({dispatch}: StateContext<PhotoStateModel>, action: photoAction.LoadPhotosFailAction): void {
    console.log(action.error);
    this.alertService.error('Load photos fail');
    dispatch({loaded: false, loading: false});
  }

  //////////////////////////////////////////////////////////
  //          add
  //////////////////////////////////////////////////////////

  @Action(photoAction.AddPhotoAction)
  addPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.AddPhotoAction): Observable<Subscription> {
    return this.photoService.create(action.photo, action.tags).pipe(
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
