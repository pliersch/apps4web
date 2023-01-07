import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { getW300Url } from "@gallery/store/photos/photo.tools";
import { Select } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";

@Component({
  selector: 'app-gallery-vertical-scroller',
  templateUrl: './gallery-vertical-scroller.component.html',
  styleUrls: ['./gallery-vertical-scroller.component.scss']
})
export class GalleryVerticalScrollerComponent implements OnInit {

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
    this.photo$.subscribe(res => console.log(res))
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
    return getW300Url(fileName);
  }

}
