import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '@modules/photos/store/photos/photo.model';
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { getW300Url } from "@modules/photos/store/photos/photo.tools";
import { Select } from "@ngxs/store";
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-photos-vertical-scroller',
    templateUrl: './photos-vertical-scroller.component.html',
    styleUrls: ['./photos-vertical-scroller.component.scss'],
    standalone: true,
    imports: [NgScrollbar]
})
export class PhotosVerticalScrollerComponent implements OnInit {

  @ViewChild(NgScrollbar)
  scrollbarRef!: NgScrollbar;

  @Select(PhotoState.getFilteredPhotos)
  photos$: Observable<Photo[]>;

  @Select(PhotoState.getCurrentPhoto)
  photo$: Observable<Photo>;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  @Output()
  selectEvent = new EventEmitter<Photo>();

  ngOnInit(): void {
    this.currentIndex$.subscribe(res => {
      this.currentIndex = res;
    });
  }

  onSelectCurrentImage(photo: Photo): void {
    this.selectEvent.emit(photo);
  }

  // TODO refactor to "scrollToIndex" without arg
  scrollTo(index: number): void {
    // this.currentIndex = index;
    // const position = index * 120;
    // void this.scrollbarRef.scrollTo({
    //   top: position
    // });
  }

  getThumbUrl(fileName: string): string {
    console.log('PhotosVerticalScrollerComponent getThumbUrl: ',)
    return getW300Url(fileName);
  }

}
