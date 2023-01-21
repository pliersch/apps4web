import { Component, ViewChild } from '@angular/core';
import { AlertService } from '@app/common/services/alert.service';
import { GalleryHorizontalScrollerComponent } from '@gallery/core';
import { TogglePhotoComparison } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from "rxjs";

// enum View {
//   Horizontal,
//   Vertical
// }

// enum ActionTypes {
//   SwitchView,
//   Filter,
//   ClearComparison
// }

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss']
})
export class GalleryLightboxComponent/*, ActionProvider*/ {

  // @ViewChild(GalleryVerticalScrollerComponent)
  // verticalScrollbarRef!: GalleryVerticalScrollerComponent;

  @ViewChild(GalleryHorizontalScrollerComponent)
  horizontalScrollbarRef!: GalleryHorizontalScrollerComponent;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;


  // viewEnum = View;
  // view = View.Horizontal;
  // index = 0;

  // private actions: Action[] = [
  //   {name: ActionTypes.SwitchView, icon: 'arrow_downward', description: 'toggle the thumbnail list', handler: this},
  //   {name: ActionTypes.Filter, icon: 'filter_alt', description: 'open the filter menu', handler: this},
  //   {name: ActionTypes.ClearComparison, icon: 'clear', description: 'clear comparison images', handler: this},
  // ]

  private subscription: Subscription;

  constructor(private alertService: AlertService,
              private store: Store) {
  }

  // onAction(action: Action): void {
  //   switch (action.name) {
  //     case ActionTypes.Filter:
  //       //
  //       break;
  //     case ActionTypes.SwitchView:
  //       this.switchView();
  //       break;
  //     case ActionTypes.ClearComparison:
  //       this.store.dispatch(new ClearPhotoComparison());
  //       break;
  //   }
  // }

  // switchView(): void {
  //   this.view = this.view === View.Horizontal ? View.Vertical : View.Horizontal;
  // }

  private scrollToActiveItem(): void {
    this.horizontalScrollbarRef.scrollToIndex(this.currentIndex);
  }

  onSelectImage(photo: Photo): void {
    this.store.dispatch(new TogglePhotoComparison(photo));
  }

}
