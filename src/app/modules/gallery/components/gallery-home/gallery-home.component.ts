import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPhotos } from '@gallery/store/photos/photo.actions';
import { allPhotos } from '@gallery/store/photos/photo.selectors';
import { Observable } from 'rxjs';
import { PhotoState } from '@gallery/store/photos/photo.state';
import { Photo } from '@gallery/store/photos/photo.model';

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent implements OnInit {

  images: Observable<Photo[]> = this.store.select(allPhotos);

  constructor(private store: Store<PhotoState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadPhotos());
  }
}
