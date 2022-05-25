import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '@gallery/store/photos/photo.model';
import { NgScrollbar } from 'ngx-scrollbar';
import { Observable } from 'rxjs';
import { getThumbUrl } from "@gallery/store/photos/photo.tools";
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

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;

  @Select(PhotoState.getCurrentPhoto)
  photo$: Observable<Photo>;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;
  currentIndex: number;

  @Output()
  selectEvent = new EventEmitter<number>();

  ngOnInit(): void {
    console.log('GalleryVerticalScrollerComponent ngOnInit: ',)
    this.photo$.subscribe(res => console.log(res))
    this.currentIndex$.subscribe(res => {
      this.currentIndex = res;
      console.log('GalleryVerticalScrollerComponent : ', res)
    });
  }

  onSelectCurrentImage(index: number): void {
    this.selectEvent.emit(index);
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
    return getThumbUrl(fileName);
  }

}
