import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GalleryVerticalScrollerComponent
} from '@gallery/components/share/vertical-scroller/gallery-vertical-scroller.component';
import {
  GalleryHorizontalScrollerComponent
} from '@gallery/components/share/horizontal-scroller/gallery-horizontal-scroller.component';
import { AlertService } from '@app/common/services/alert.service';
import { ClearPhotoComparison, TogglePhotoComparison } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { Action, ActionProvider } from "@modules/action-bar/actions";
import { ActionBarService } from "@modules/action-bar/action-bar.service";

enum View {
  Horizontal,
  Vertical
}

enum ActionTypes {
  SwitchView,
  Filter,
  ClearComparison
}

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent implements OnInit, OnDestroy, ActionProvider {

  @ViewChild(GalleryVerticalScrollerComponent)
  verticalScrollbarRef!: GalleryVerticalScrollerComponent;

  @ViewChild(GalleryHorizontalScrollerComponent)
  horizontalScrollbarRef!: GalleryHorizontalScrollerComponent;

  viewEnum = View;
  view = View.Horizontal;
  index = 0;

  private actions: Action[] = [
    {name: ActionTypes.SwitchView, icon: 'arrow_downward', description: 'toggle the thumbnail list', handler: this},
    {name: ActionTypes.Filter, icon: 'filter_alt', description: 'open the filter menu', handler: this},
    {name: ActionTypes.ClearComparison, icon: 'clear', description: 'clear comparison images', handler: this},
  ]

  constructor(private alertService: AlertService,
              private actionBarService: ActionBarService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.actionBarService.setActions(this.actions);
  }

  ngOnDestroy(): void {
    this.actionBarService.removeActions();
  }

  onAction(action: Action): void {
    switch (action.name) {
      case ActionTypes.Filter:
        // TODO implement
        break;
      case ActionTypes.SwitchView:
        this.switchView();
        break;
      case ActionTypes.ClearComparison:
        this.store.dispatch(new ClearPhotoComparison());
        break;
    }
  }

  switchView(): void {
    this.view = this.view === View.Horizontal ? View.Vertical : View.Horizontal;
  }

  onSelectImage(photo: Photo): void {
    this.store.dispatch(new TogglePhotoComparison(photo));
  }

}
