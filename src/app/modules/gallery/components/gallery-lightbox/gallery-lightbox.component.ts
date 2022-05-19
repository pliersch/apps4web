import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GalleryVerticalScrollerComponent
} from '@gallery/components/gallery-vertical-scroller/gallery-vertical-scroller.component';
import {
  GalleryHorizontalScrollerComponent
} from '@gallery/components/gallery-horizontal-scroller/gallery-horizontal-scroller.component';
import { AlertService } from '@app/services/alert.service';
import { Photo } from '@gallery/store/photos/photo.model';
import { ClearPhotoSelectionAction, LoadPhotosAction } from "@gallery/store/photos/photo.actions";
import { ActionBarService } from "@app/services/action-bar.service";
import { Action, ActionProvider } from "@app/models/actions";

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
    {name: ActionTypes.SwitchView, icon: 'arrow_downward', tooltip: 'toggle the thumbnail list', handler: this},
    {name: ActionTypes.Filter, icon: 'filter_alt', tooltip: 'open the filter menu', handler: this},
    {name: ActionTypes.ClearComparison, icon: 'clear', tooltip: 'clear comparison images', handler: this},
  ]

  constructor(private alertService: AlertService,
              private actionBarService: ActionBarService,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPhotosAction(60));
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
        this.store.dispatch(new ClearPhotoSelectionAction());
        break;
    }
  }

  switchView(): void {
    this.view = this.view === View.Horizontal ? View.Vertical : View.Horizontal;
  }

  onSelectImage(event: { index: number, selection: Photo[] }): void {
    this.index = event.index;
  }

  nextSlide(): void {
    this.updateSlideIndex(1);
  }

  prevSlide(): void {
    this.updateSlideIndex(-1);
  }

  updateSlideIndex(n: number): void {
    this.index += n;
    this.scrollToActiveItem();
  }

  private scrollToActiveItem(): void {
    if (this.view === View.Horizontal) {
      // this.horizontalScrollbarRef.scrollTo(this.index);
    } else {
      this.verticalScrollbarRef.scrollTo(this.index);
    }
  }
}
