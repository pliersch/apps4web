import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import * as photoAction from "@gallery/store/photos/photo.actions";
import { Photo, PhotoDeleteDto, PhotoDto, PhotoMetaDataDto, PhotoUpdate } from "@gallery/store/photos/photo.model";
import { append, insertItem, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { filterByRating, filterByTags, filterByYear } from "@gallery/store/photos/photo.tools";
import { AlertService } from "@app/common/services/alert.service";
import { PhotoService } from "@gallery/services/photo.service";
import { ServerSentService } from "@app/common/services/server-sent.service";
import { Tag } from "@gallery/store/tags/tag.model";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { difference } from "@app/common/util/array-utils";

export interface PhotoStateModel {
  photos: Photo[];
  currentIndex: number;
  editPhotos: Photo[];
  selectedDownloads: Photo[];
  finalDownloads: Photo[];
  comparePhotos: Photo[];
  availableServerPhotos: number;
  tagFilter: Tag[];
  filterRating: number;
  filterFrom: number;
  filterTo: number;
  newDataAvailable: boolean;
  loaded: boolean;
  loading: boolean;
}

@State<PhotoStateModel>({
  name: 'Photo',
  defaults: {
    photos: [],
    comparePhotos: [],
    selectedDownloads: [],
    finalDownloads: [],
    editPhotos: [],
    currentIndex: 0,
    newDataAvailable: true,
    availableServerPhotos: 0,
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
              private store: Store,
              private alertService: AlertService) { }

  // region selectors
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

  @Selector([PhotoState.getPhotosByTags, PhotoState.getFinalDownloads, PhotoState.getFilterRating, PhotoState.getFilterFrom, PhotoState.getFilterTo])
  static getFilteredPhotos(photos: Photo[], downloads: Photo[], filterRating: number, filterFrom: number, filterTo: number): Photo[] {
    let filteredPhotos: Photo[] = difference(photos, downloads);
    filteredPhotos = filterByRating(filteredPhotos, filterRating);
    filteredPhotos = filterByYear(filteredPhotos, filterFrom, filterTo);
    return filteredPhotos;
  }

  @Selector([PhotoState.getFilteredPhotos, PhotoState.getCurrentIndex])
  static getCurrentPhoto(photos: Photo[], index: number): Photo {
    return photos[index];
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
    return state.availableServerPhotos;
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
  static getSelectedDownloads(state: PhotoStateModel): Photo[] {
    return state.selectedDownloads;
  }

  @Selector()
  static getFinalDownloads(state: PhotoStateModel): Photo[] {
    return state.finalDownloads;
  }

  @Selector()
  static getLoadedPhotos(state: PhotoStateModel): number {
    return state.photos.length;
  }

  // endregion

  // region server sent
  //////////////////////////////////////////////////////////
  //          server sent new photos available
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetNewPhotosAvailable)
  setNewPhotosAvailable(ctx: StateContext<PhotoStateModel>): void {
    ctx.patchState({
      newDataAvailable: true // todo rename
    });
  }

  // endregion

  // region meta data
  //////////////////////////////////////////////////////////
  //          meta data
  //////////////////////////////////////////////////////////

  @Action(photoAction.LoadMetaData)
  loadMetaData(ctx: StateContext<PhotoStateModel>): Observable<Subscription> {
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
      availableServerPhotos: action.dto.count, loading: false
    });
  }

  @Action(photoAction.LoadMetaDataFail)
  loadMetaDataFail(ctx: StateContext<PhotoStateModel>): void {
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
    const unloadedPhotos: number = state.availableServerPhotos - state.photos.length;
    const count: number = unloadedPhotos < action.count ? unloadedPhotos : action.count;
    if (count == 0) {
      return of(Subscription.EMPTY);
    }
    // const snapshot = this.store.selectSnapshot(AccountState.user);
    console.log('PhotoState loadPhotos: ')
    return this.photoService.getPhotos(from, count)
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
    for (const photo of action.dto.photos) {
      photo.recordDate = new Date(photo.recordDate);
    }
    const photos: Photo[] = [...state.photos, ...action.dto.photos]
    ctx.patchState({
      photos: photos, loaded: true, loading: false
    });
  }

  @Action(photoAction.LoadPhotosFail)
  loadPhotosFail({dispatch}: StateContext<PhotoStateModel>): void {
    this.alertService.error('Load photos fail');
    dispatch({loaded: false, loading: false});
  }

  // endregion

  // region current
  //////////////////////////////////////////////////////////
  //          set current
  //////////////////////////////////////////////////////////

  @Action(photoAction.SetCurrentPhoto)
  setCurrentPhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.SetCurrentPhoto): void {
    const index = this._getFilteredPhotos(ctx.getState()).indexOf(action.photo);
    ctx.patchState({
      currentIndex: index
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

  // endregion

  // region add
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
      availableServerPhotos: state.availableServerPhotos + 1,
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

  // endregion

  // region update
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
            ctx.dispatch(new photoAction.UpdatePhotoSuccess(photo))
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
        photos: updateItem<Photo>(p => p!.id === photo.id, patch({
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

  // endregion

  // region delete
  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(photoAction.DeletePhoto)
  deletePhoto(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhoto): Observable<Subscription> {
    return this.photoService.delete(action.id).pipe(
      map((dto: PhotoDeleteDto) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.DeletePhotoSuccess(dto))
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
    const state = ctx.getState();
    const available = state.availableServerPhotos;
    ctx.setState(
      patch({
        photos: removeItem<Photo>(photo => photo!.id === action.dto.id),
        availableServerPhotos: available === 0 ? 0 : available - 1,
      })
    );
  }

  @Action(photoAction.DeletePhotoFail)
  deletePhotoFail(): void {
    this.alertService.error('Delete fail');
  }

  @Action(photoAction.DeletePhotos)
  deletePhotos(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotos): Observable<Subscription> {
    return this.photoService.deletePhotos(action.ids).pipe(
      map((result: DeleteResult) =>
        asapScheduler.schedule(() =>
          ctx.dispatch(new photoAction.DeletePhotosSuccess(result, action.ids))
        )
      ),
      catchError(error =>
        of(
          asapScheduler.schedule(() =>
            ctx.dispatch(new photoAction.DeletePhotosFail(error))
          )
        )
      )
    );
  }

  @Action(photoAction.DeletePhotosSuccess)
  deletePhotosSuccess(ctx: StateContext<PhotoStateModel>, action: photoAction.DeletePhotosSuccess): void {
    const state = ctx.getState();
    const ids = action.ids;
    const deleteCount = action.result.affected;
    if (ids.length !== deleteCount) {
      this.alertService.error('Delete many photos fail');
      return;
    }
    const editPhotos: Photo[] = [];
    for (const id of action.ids) {
      ctx.setState(
        patch({
          photos: removeItem<Photo>(photo => photo!.id === id),
          availableServerPhotos: state.availableServerPhotos - deleteCount,
          editPhotos: editPhotos
        })
      );
    }
  }

  @Action(photoAction.DeletePhotosFail)
  deletePhotosFail(): void {
    this.alertService.error('Delete fail');
  }

  // endregion

  // region compare
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
            ? removeItem<Photo>(photo => photo!.id === action.photo.id)
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

  // endregion

  // region manage select
  //////////////////////////////////////////////////////////
  //          manage
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoEdit)
  toggleGroupEdit(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoEdit): void {
    const contains = ctx.getState().editPhotos.includes(action.photo);
    ctx.setState(
      patch({
        editPhotos:
          contains
            ? removeItem<Photo>(photo => photo!.id === action.photo.id)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.SelectAllFilteredPhotosEdit)
  selectAllFilteredPhotos(ctx: StateContext<PhotoStateModel>): void {
    ctx.setState(
      patch({
        editPhotos: this._getFilteredPhotos(ctx.getState())
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

  @Action(photoAction.ToggleSelection)
  toggleSelection(ctx: StateContext<PhotoStateModel>): void {
    const filteredPhotos = this._getFilteredPhotos(ctx.getState());
    const editPhotos = ctx.getState().editPhotos;
    const diff = difference(filteredPhotos, editPhotos);
    ctx.setState(
      patch({editPhotos: diff})
    );
  }

  // endregion

  // region download
  //////////////////////////////////////////////////////////
  //          download
  //////////////////////////////////////////////////////////

  @Action(photoAction.TogglePhotoDownload)
  toggleDownload(ctx: StateContext<PhotoStateModel>, action: photoAction.TogglePhotoDownload): void {
    const isDownload = ctx.getState().selectedDownloads.includes(action.photo);
    ctx.setState(
      patch({
        selectedDownloads:
          isDownload
            ? removeItem<Photo>(photo => photo!.id === action.photo.id)
            : insertItem<Photo>(action.photo)
      })
    );
  }

  @Action(photoAction.SelectAllDownloads)
  selectAllDownload(ctx: StateContext<PhotoStateModel>): void {
    const filteredPhotos = this._getFilteredPhotos(ctx.getState());
    ctx.setState(patch({selectedDownloads: filteredPhotos}));
  }

  @Action(photoAction.MoveToFinalDownloads)
  moveToFinalDownload(ctx: StateContext<PhotoStateModel>): void {
    const state = ctx.getState();
    const cleared: Photo[] = [];
    ctx.setState(patch({
      finalDownloads: [...state.finalDownloads, ...state.selectedDownloads],
      selectedDownloads: cleared
    }));
  }

  @Action(photoAction.DeselectAllDownloads)
  deselectAllDownloads(ctx: StateContext<PhotoStateModel>): void {
    const photos: Photo[] = []; // patchObj want's typed array
    ctx.setState(
      patch({selectedDownloads: photos})
    );
  }

  @Action(photoAction.ToggleAllDownload)
  togglePhotosDownload(ctx: StateContext<PhotoStateModel>): void {
    const filteredPhotos = this._getFilteredPhotos(ctx.getState());
    const downloads = ctx.getState().selectedDownloads;
    const diff = difference(filteredPhotos, downloads);
    ctx.setState(
      patch({selectedDownloads: diff})
    );
  }

  // endregion

  // region rating
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
        photos: updateItem<Photo>(photo => photo?.id === action.photo!.id,
          patch({rating: action.rate})),
      })
    );
  }

  @Action(photoAction.SetRatingFail)
  setRatingFail(): void {
    this.alertService.error('Rating photo fail');
  }

  // endregion

  // region filter
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

  // endregion

  // region helper
  // Look for better solution when ngxs updates to v4
  private _getFilteredPhotos(state: PhotoStateModel): Photo[] {
    return PhotoState.getFilteredPhotos(
      PhotoState.getPhotosByTags(PhotoState.getPhotos(state), PhotoState.getActiveTags(state)),
      PhotoState.getFinalDownloads(state),
      PhotoState.getFilterRating(state),
      PhotoState.getFilterFrom(state),
      PhotoState.getFilterTo(state));
  }

  // endregion
}
