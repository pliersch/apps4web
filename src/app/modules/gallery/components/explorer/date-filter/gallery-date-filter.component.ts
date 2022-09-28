import { Component, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";
import { Photo } from "@gallery/store/photos/photo.model";
import { SetFromYearFilter, SetToYearFilter } from "@gallery/store/photos/photo.actions";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-gallery-date-filter',
  templateUrl: './gallery-date-filter.component.html',
  styleUrls: ['./gallery-date-filter.component.scss']
})
export class GalleryDateFilterComponent implements OnInit {

  @Select(PhotoState.getPhotosByTags)
  photos$: Observable<Photo[]>;

  fromYears: number[];
  toYears: number[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.photos$.subscribe({
      next: (photos) => this.updateAvailableYears(photos)
    })
  }

  private updateAvailableYears(photos: Photo[]): void {
    let years: number[] = [];
    for (const photo of photos) {
      years.push(new Date(photo.recordDate).getFullYear());
    }
    years = Array.from(new Set(years))
    years.sort(function (a, b) {
      return a - b;
    });
    this.fromYears = years.slice(0);
    this.toYears = years.slice(0);
  }

  onChangeFrom($event: MatSelectChange): void {
    const year: number = $event.value === undefined ? this.fromYears[0] : $event.value;
    this.store.dispatch(new SetFromYearFilter(year));
  }

  onChangeTo($event: MatSelectChange): void {
    const year: number = $event.value === undefined ? this.toYears[this.toYears.length - 1] : $event.value;
    this.store.dispatch(new SetToYearFilter(year));
  }
}
