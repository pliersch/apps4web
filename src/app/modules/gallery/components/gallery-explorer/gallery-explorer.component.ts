import {Component, OnDestroy, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {PhotoState} from "@gallery/store/photos/photo-state";
import {Action, ActionProvider} from "@app/models/actions";
import {ActionBarService} from "@app/services/action-bar.service";
import {TogglePhotoDownloadAction} from "@gallery/store/photos/photo-actions";

enum ActionTypes {
  SelectAll,
  DeselectAll,
  ClearComparison
}

@Component({
  selector: 'app-gallery-explorer',
  templateUrl: './gallery-explorer.component.html',
  styleUrls: ['./gallery-explorer.component.scss']
})
export class GalleryExplorerComponent implements OnInit, OnDestroy, ActionProvider {

  @Select(PhotoState.getPhotos)
  images: Observable<Photo[]>;

  @Select(PhotoState.getDownloads)
  downloads: Observable<Photo[]>;

  currentImage: Photo;
  showFilter = true;

  private actions: Action[] = [
    {name: ActionTypes.SelectAll, icon: 'done_all', tooltip: 'select all', handler: this},
    {name: ActionTypes.DeselectAll, icon: 'remove_done', tooltip: 'deselect all', handler: this},
    {name: ActionTypes.ClearComparison, icon: 'published_with_changes', tooltip: 'toggle selection', handler: this},
  ]

  constructor(private actionBarService: ActionBarService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.actionBarService.setActions(this.actions);
  }

  ngOnDestroy(): void {
    this.actionBarService.removeActions();
  }

  setCurrent(image: Photo): void {
    this.currentImage = image;
  }

  onAction(action: Action): void {
  }

  onSelectForDownload($event: Photo): void {
    this.store.dispatch(new TogglePhotoDownloadAction($event));
    console.log('GalleryExplorerComponent onSelectForDownload: ', $event)
  }
}
