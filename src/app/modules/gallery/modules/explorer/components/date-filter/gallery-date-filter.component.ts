import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";
import { SetFromYearFilter, SetToYearFilter } from "@gallery/store/photos/photo.actions";
import { Photo } from "@gallery/store/photos/photo.model";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-gallery-date-filter',
  templateUrl: './gallery-date-filter.component.html',
  styleUrls: ['./gallery-date-filter.component.scss']
})
export class GalleryDateFilterComponent implements OnInit {

  @Select(PhotoState.getPhotosByTagsAndRating)
  photos$: Observable<Photo[]>;

  @Select(PhotoState.getFilterFrom)
  yearFrom$: Observable<number>;

  @Select(PhotoState.getFilterTo)
  yearTo$: Observable<number>;

  years: number[];
  selectedFrom = '';
  selectedTo = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.photos$.subscribe((photos) => {
      this.years = this.computeAvailableYears(photos);
    })
    this.yearFrom$.subscribe((year) => {
      if (year === -1) {
        this.selectedFrom = ''
      }
    });
    this.yearTo$.subscribe((year) => {
      if (year === -1) {
        this.selectedTo = ''
      }
    });
  }

  onChangeFrom($event: MatSelectChange): void {
    const year: number = $event.value === undefined ? this.years[0] : $event.value;
    this.store.dispatch(new SetFromYearFilter(year));
  }

  onChangeTo($event: MatSelectChange): void {
    const year: number = $event.value === undefined ? this.years[this.years.length - 1] : $event.value;
    this.store.dispatch(new SetToYearFilter(year));
  }

  computeAvailableYears(photos: Photo[]): number[] {
    let years: number[] = [];
    for (const photo of photos) {
      years.push(new Date(photo.recordDate).getFullYear());
    }
    years = Array.from(new Set(years))
    years.sort(function (a, b) {
      return a - b;
    });
    return years;
  }

}
