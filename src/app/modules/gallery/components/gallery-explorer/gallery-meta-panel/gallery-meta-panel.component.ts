import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-meta-panel',
  templateUrl: './gallery-meta-panel.component.html',
  styleUrls: ['./gallery-meta-panel.component.scss']
})
export class GalleryMetaPanelComponent {

  @Input()
  allPhotosCount: number;

  constructor() { }

}
