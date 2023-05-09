import { Component } from '@angular/core';

@Component({
  selector: 'app-photos-image-placeholder',
  templateUrl: './photos-image-placeholder.component.svg',
  styleUrls: ['./photos-image-placeholder.component.scss']
})
export class PhotosImagePlaceholderComponent {

  fillColor = 'rgb(255, 0, 0)';

  changeColor(): void {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }

}
