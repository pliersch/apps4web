import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Photo } from '@modules/photos/store/photos/photo.model';
import { PhotoState } from '@modules/photos/store/photos/photo.state';
import { getW900Url } from "@modules/photos/store/photos/photo.tools";
import { Select } from "@ngxs/store";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photos-image-grid',
  templateUrl: './photos-image-grid.component.html',
  styleUrls: ['./photos-image-grid.component.scss']
})
export class PhotosImageGridComponent implements OnInit {

  @Select(PhotoState.getComparePhotos)
  selection: Observable<Photo[]>

  @Output()
  closeEvent = new EventEmitter<Photo>();

  layoutTiles = 0;
  colsAvailable = 1;
  rowHeight = '2:1';
  cols = 1;
  rows = 1;

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
    return getW900Url(fileName);
  }

  onClickClose(photo: Photo): void {
    this.closeEvent.emit(photo);
  }
}
