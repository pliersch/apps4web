import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-photos-meta-editor-panel',
    templateUrl: './photos-meta-panel-editor.component.html',
    styleUrls: ['./photos-meta-panel-editor.component.scss'],
    standalone: true,
    imports: [MatCardModule]
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
