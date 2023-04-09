import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-meta-explorer-panel',
  templateUrl: './gallery-meta-panel-explorer.component.html',
  styleUrls: ['./gallery-meta-panel-explorer.component.scss']
})
export class GalleryMetaPanelExplorerComponent {

  @Input()
  availablePhotos: number;

  @Input()
  loadedPhotos: number;

  @Input()
  filteredPhotosCount: number;

  @Input()
  finalDownloadsPhotosCount: number;

}
