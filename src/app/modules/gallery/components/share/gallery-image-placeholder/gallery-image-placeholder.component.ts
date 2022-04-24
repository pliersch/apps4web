import {Component} from '@angular/core';

@Component({
  selector: 'app-gallery-image-placeholder',
  templateUrl: './gallery-image-placeholder.component.svg',
  styleUrls: ['./gallery-image-placeholder.component.scss']
})
export class GalleryImagePlaceholderComponent {

  fillColor = 'rgb(255, 0, 0)';

  changeColor(): void {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }

}
