import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-photos-meta-explorer-panel',
    templateUrl: './photos-meta-panel-explorer.component.html',
    styleUrls: ['./photos-meta-panel-explorer.component.scss'],
    standalone: true,
    imports: [MatCardModule]
})
export class PhotosMetaPanelExplorerComponent {

  @Input()
  availablePhotos: number;

  @Input()
  loadedPhotos: number;

  @Input()
  filteredPhotosCount: number;

  @Input()
  finalDownloadsPhotosCount: number;

}
