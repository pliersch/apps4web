import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Photo} from '@gallery/store/photos/photo.model';
import {LoadPhotosAction} from "@gallery/store/photos/photo-actions";

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery-home.component.html',
  styleUrls: ['./gallery-home.component.scss']
})
export class GalleryHomeComponent implements OnInit {

  images: Observable<Photo[]> = this.store.select(state => state.gallery.photos);

  // constructor(private store: Store<PhotoState>) {}
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPhotosAction());
  };
}
