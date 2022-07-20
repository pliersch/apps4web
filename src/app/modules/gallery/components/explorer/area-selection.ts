import SelectionArea from "@viselect/vanilla";

export interface AreaSelectionHandler {
  onSelectionFinish(pictureIds: string[]): void;
}

export class AreaSelection {

  constructor(private handler: AreaSelectionHandler) {
    this.initializeSelectionArea();
  }

  private initializeSelectionArea(): void {
    const selection = new SelectionArea({
      selectables: ['.selection-area-container > .selection-item'],
      boundaries: ['.selection-area-container'],
      features: {
        // Enable / disable touch support.
        touch: true,
        // Range selection.
        range: true,
        // Configuration in case a selectable gets just clicked.
        singleTap: {
          // Enable single-click selection (Also disables range-selection via shift + ctrl).
          allow: false,
          // 'native' (element was mouse-event target) or 'touch' (element visually touched).
          intersect: 'native'
        }
      }
    }).on('start', ({store, event}) => {
      if (!event!.ctrlKey && !event!.metaKey) {
        for (const el of store.stored) {
          el.classList.remove('selected');
        }
        selection.clearSelection();
      }
    }).on('move', ({store: {changed: {added, removed}}}) => {
      for (const el of added) {
        el.classList.add('selected');
      }

      for (const el of removed) {
        el.classList.remove('selected');
      }
    }).on('stop', evt => {
      selection.clearSelection();
      for (const el of evt.store.selected) {
        el.classList.remove('selected');
      }
      const photoIds: string[] = this.findPhotoIds(evt.store.selected);
      this.handler.onSelectionFinish(photoIds);
    });
  }

  private findPhotoIds(selected: Array<Element>): string[] {
    let imageIds: string[] = [];
    for (const element of selected) {
      imageIds.push(element.getElementsByTagName('img')[0].id);
    }
    return imageIds;
  }
}
