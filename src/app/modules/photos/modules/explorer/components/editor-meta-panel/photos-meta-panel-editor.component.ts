import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photos-meta-editor-panel',
  templateUrl: './photos-meta-panel-editor.component.html',
  styleUrls: ['./photos-meta-panel-editor.component.scss']
})
export class PhotosMetaPanelEditorComponent {

  @Input()
  availablePhotos: number;

  @Input()
  loadedPhotos: number;

  @Input()
  selectedPhotosCount: number;

  @Input()
  filteredPhotosCount: number;

}
