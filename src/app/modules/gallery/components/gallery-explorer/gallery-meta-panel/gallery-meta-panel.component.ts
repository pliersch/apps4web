import { Component, Input } from '@angular/core';
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { Observable } from "rxjs";
import { PhotoStateMetaData } from "@gallery/store/photos/photo.state";

@Component({
  selector: 'app-gallery-meta-panel',
  templateUrl: './gallery-meta-panel.component.html',
  styleUrls: ['./gallery-meta-panel.component.scss']
})
export class GalleryMetaPanelComponent {

  @Input()
  metaData: Observable<PhotoStateMetaData>;

  constructor() { }

}
