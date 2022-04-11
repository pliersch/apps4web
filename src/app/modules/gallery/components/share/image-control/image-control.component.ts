import {Component, Input} from '@angular/core';
import {Photo} from "@gallery/store/photos/photo.model";

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.scss']
})
export class ImageControlComponent {

  @Input()
  photo: Photo;

  @Input()
  selected: boolean;

  constructor() {
  }

  onClickDownload(): void {
    console.log('ImageControlComponent onClickDownload: ', this.photo.fileName)
  }
}
