import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-photos-meta-explorer-panel',
  templateUrl: './photos-meta-panel-explorer.component.html',
  styleUrls: ['./photos-meta-panel-explorer.component.scss']
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
