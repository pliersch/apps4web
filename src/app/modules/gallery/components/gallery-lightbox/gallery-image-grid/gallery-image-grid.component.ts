import {Component, OnInit} from '@angular/core';
import {Photo} from '@gallery/store/photos/photo.model';
import {Observable} from 'rxjs';
import {PhotoState} from '@gallery/store/photos/photo-state';
import {Select, Store} from "@ngxs/store";
import {getPhotoUrl} from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-gallery-image-grid',
  templateUrl: './gallery-image-grid.component.html',
  styleUrls: ['./gallery-image-grid.component.scss']
})
export class GalleryImageGridComponent implements OnInit {

  @Select(PhotoState.getComparePhotos)
  selection: Observable<Photo[]>

  layoutTiles = 0;
  colsAvailable = 1;
  rowHeight = '2:1';
  cols = 1;
  rows = 1;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.selection.subscribe((photos) => {
      this.computeTiles(photos.length);
    });
  }

  computeTiles(length: number): void {
    switch (length) {
      case 1:
        this.layoutTiles = 0;
        this.colsAvailable = 1;
        this.rowHeight = '2:1';
        this.cols = 1;
        this.rows = 1;
        break;
      case 2:
        this.layoutTiles = 1;
        this.colsAvailable = 2;
        this.rowHeight = '1:1';
        this.cols = 1;
        this.rows = 1;
        break;
      case 3:
        this.layoutTiles = 2;
        this.colsAvailable = 2;
        this.rowHeight = '1:1';
        this.cols = 1;
        this.rows = 1;
        break;
      case 4:
        this.layoutTiles = 2;
        this.colsAvailable = 2;
        this.rowHeight = '3:1';
        this.cols = 1;
        this.rows = 1;
        break;
      case 5:
        this.layoutTiles = 3;
        this.colsAvailable = 3;
        this.rowHeight = '3:1';
        this.cols = 1;
        this.rows = 1;
        break;
      case 6:
        this.layoutTiles = 3;
        this.colsAvailable = 3;
        this.rowHeight = '3:1';
        this.cols = 1;
        this.rows = 1;
        break;
    }
  }

  getPhotoUrl(fileName: string): string {
    return getPhotoUrl(fileName);
  }
}
