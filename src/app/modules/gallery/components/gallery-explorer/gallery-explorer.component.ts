import {Component, OnDestroy, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {PhotoState} from "@gallery/store/photos/photo-state";
import {Action, ActionProvider} from "@app/models/actions";
import {ActionBarService} from "@app/services/action-bar.service";
import {
  DeselectAllPhotosAction,
  SelectAllPhotosAction,
  TogglePhotoDownloadAction, TogglePhotosDownloadAction, TogglePhotoSelectionAction
} from "@gallery/store/photos/photo-actions";
import {tap} from "rxjs/operators";

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ToggleSelection
}

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit, OnDestroy, ActionProvider {

  @Select(PhotoState.getPhotos)
  images: Observable<Photo[]>;

  @Select(PhotoState.downloads)
  downloads$: Observable<Photo[]>;
  downloads: Photo[];

  currentImage: Photo;
  showFilter = true;

  private actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ToggleSelection, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
  ]

  constructor(private actionBarService: ActionBarService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.actionBarService.setActions(this.actions);
    this.downloads$.subscribe(res => this.downloads = res);
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
    }
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new TogglePhotoDownloadAction($event));
  }

  isSelected(photo: Photo): boolean {
    return this.downloads.includes(photo);
  }
}
