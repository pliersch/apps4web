import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-meta-editor-panel',
  templateUrl: './gallery-meta-panel-editor.component.html',
  styleUrls: ['./gallery-meta-panel-editor.component.scss']
})
export class GalleryMetaPanelEditorComponent {

  @Input()
  availablePhotos: number;

  @Input()
  loadedPhotos: number;

  @Input()
  selectedPhotosCount: number;

  @Input()
  filteredPhotosCount: number;

}
