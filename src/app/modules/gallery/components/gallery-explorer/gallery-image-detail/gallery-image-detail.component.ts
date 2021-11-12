import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';

@Component({
  selector: 'app-gallery-image-detail',
  templateUrl: './gallery-image-detail.component.html',
  styleUrls: ['./gallery-image-detail.component.scss']
})

export class GalleryImageDetailComponent implements OnInit {

  @Input()
  currentPhoto: Photo;

  constructor() {
  }

  ngOnInit(): void {
    //   const data = of('[{"id":1},{"id":2},{"id":3},{"id":4}]');
    //
    //   data.pipe(
    //     map((value) => JSON.parse(value)),
    //     // startWith(false),
    //   ).subscribe(console.log);
  }
}
