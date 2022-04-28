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
  SelectAllPhotosAction,
  TogglePhotoDownloadAction,
  TogglePhotosDownloadAction
} from "@gallery/store/photos/photo-actions";

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
    const selection = new SelectionArea({
      selectables: ['.selection-area-container > div'],
      boundaries: ['.selection-area-container']
    }).on('start', ({store, event}) => {
      console.log('GalleryExplorerComponent start: ',)
      if (!event!.ctrlKey && !event!.metaKey) {

        for (const el of store.stored) {
          el.classList.remove('selected');
        }

        selection.clearSelection();
      }
    }).on('move', ({store: {changed: {added, removed}}}) => {
      console.log('GalleryExplorerComponent move: ',)
      for (const el of added) {
        el.classList.add('selected');
      }

      for (const el of removed) {
        el.classList.remove('selected');
      }
    });

    // this.initializeSelectionArea();
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

  private initializeSelectionArea(): void {
    const selection = new SelectionArea({

      // Class for the selection-area itself (the element).
      selectionAreaClass: 'selection-area',

      // Class for the selection-area container.
      selectionContainerClass: 'selection-area-container',

      // Query selector or dom-node to set up container for the selection-area element.
      container: 'body',

      // // document object - if you want to use it within an embed document (or iframe).
      // document: window.document,

      // // Query selectors for elements which can be selected.
      // selectables: [],

      // Query selectors for elements from where a selection can be started from.
      startAreas: ['html'],

      // Query selectors for elements which will be used as boundaries for the selection.
      boundaries: ['html'],

      // Behaviour related options.
      behaviour: {

        // Specifies what should be done if already selected elements get selected again.
        //   invert: Invert selection for elements which were already selected
        //   keep: Keep selected elements (use clearSelection() to remove those)
        //   drop: Remove stored elements after they have been touched
        overlap: 'invert',

        // On which point an element should be selected.
        // Available modes are cover (cover the entire element), center (touch the center) or
        // the default mode is touch (just touching it).
        intersect: 'touch',

        // px, how many pixels the point should move before starting the selection (combined distance).
        // Or specifiy the threshold for each axis by passing an object like {x: <number>, y: <number>}.
        startThreshold: 10,

        // Scroll configuration.
        scrolling: {

          // On scrollable areas the number on px per frame is devided by this amount.
          // Default is 10 to provide a enjoyable scroll experience.
          speedDivider: 10,

          // Browsers handle mouse-wheel events differently, this number will be used as
          // numerator to calculate the mount of px while scrolling manually: manualScrollSpeed / scrollSpeedDivider.
          manualSpeed: 750,

          // This property defines the virtual inset margins from the borders of the container
          // component that, when crossed by the mouse/touch, trigger the scrolling. Useful for
          // fullscreen containers.
          startScrollMargins: {x: 0, y: 0}
        }
      },

      // Features.
      features: {

        // Enable / disable touch support.
        touch: true,

        // Range selection.
        range: true,

        // Configuration in case a selectable gets just clicked.
        singleTap: {

          // Enable single-click selection (Also disables range-selection via shift + ctrl).
          allow: true,

          // 'native' (element was mouse-event target) or 'touch' (element visually touched).
          intersect: 'native'
        }
      }
    });
    selection.on('beforestart', evt => {

      // Use this event to decide whether a selection should take place or not.
      // For example if the user should be able to normally interact with input-elements you
      // may want to prevent a selection if the user clicks such a element:
      // selection.on('beforestart', ({event}) => {
      //   return event.target.tagName !== 'INPUT'; // Returning false prevents a selection
      // });

      console.log('beforestart', evt);
    }).on('beforedrag', evt => {

      // Same as 'beforestart' but before a selection via dragging happens.
      console.log('beforedrag', evt);
    }).on('start', evt => {

      // A selection got initiated, you could now clear the previous selection or
      // keep it if in case of multi-selection.
      console.log('start', evt);
    }).on('move', evt => {

      // Here you can update elements based on their state.
      console.log('move', evt);
    }).on('stop', evt => {

      // Do something with the selected elements.
      console.log('stop', evt);
    });
  }
}
