import {Component, OnDestroy, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {PhotoState} from "@gallery/store/photos/photo-state";
import {Action, ActionProvider} from "@app/models/actions";
import {ActionBarService} from "@app/services/action-bar.service";
import SelectionArea from '@viselect/vanilla'
import {
  DeselectAllPhotosAction,
  SelectAllPhotosAction, SelectManyPhotosAction,
  TogglePhotoDownloadAction,
  TogglePhotosDownloadAction
} from "@gallery/store/photos/photo-actions";
import {map} from "rxjs/operators";
import {AreaSelection, AreaSelectionHandler} from "@gallery/components/gallery-explorer/area-selection";
import {PhotoService} from "@app/core/services/photo.service";

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ToggleSelection,
  Download
}

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit, OnDestroy, ActionProvider, AreaSelectionHandler {

  @Select(PhotoState.getPhotos)
  images$: Observable<Photo[]>;
  images: Photo[];

  @Select(PhotoState.downloads)
  downloads$: Observable<Photo[]>;
  downloads: Photo[];

  currentImage: Photo;
  showFilter = true;

  private areaSelection: AreaSelection;

  private actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
    {name: ActionTypes.Download, icon: 'download', tooltip: 'download', handler: this},
  ]

  constructor(private actionBarService: ActionBarService,
              private photoService: PhotoService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.actionBarService.setActions(this.actions);
    this.downloads$.subscribe(res => this.downloads = res);
    this.images$.subscribe(res => this.images = res);
    this.initializeSelectionArea();
  }

  ngOnDestroy(): void {
    this.actionBarService.removeActions();
  }

  setCurrent(image: Photo): void {
    this.currentImage = image;
  }

  onAction(action: Action): void {
    switch (action.name) {
      case ActionTypes.SelectAll:
        this.store.dispatch(new SelectAllPhotosAction());
        break;
      case ActionTypes.DeselectAll:
        this.store.dispatch(new DeselectAllPhotosAction());
        break;
      case ActionTypes.ToggleSelection:
        this.store.dispatch(new TogglePhotosDownloadAction());
        break;
      case ActionTypes.Download:
        this.photoService.download(this.downloads);
        break;
    }
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new TogglePhotoDownloadAction($event));
  }

  isSelected(photo: Photo): boolean {
    return this.downloads.includes(photo);
  }

  private initializeSelectionArea(): void {
    this.areaSelection = new AreaSelection(this);
  }

  onSelectionFinish(photoFileNames: string[]): void {
    let photos: Photo[] = [];
    for (const fileName of photoFileNames) {
      let photo = this.images.find(img => img.fileName == fileName);
      if (photo) {
        photos.push(photo);
      } else {
        console.log('GalleryExplorerComponent err why cant find the id?: ', fileName)
      }
    }
    this.store.dispatch(new SelectManyPhotosAction(photos));
  }

}
