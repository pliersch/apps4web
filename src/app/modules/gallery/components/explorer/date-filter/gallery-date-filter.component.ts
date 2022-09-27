import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Observable } from "rxjs";
import { Photo } from "@gallery/store/photos/photo.model";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-gallery-date-filter',
  templateUrl: './gallery-date-filter.component.html',
  styleUrls: ['./gallery-date-filter.component.scss']
})
export class GalleryDateFilterComponent implements OnInit {

  @Select(PhotoState.getPhotos)
  photos$: Observable<Photo[]>;

  years: number[];
  from: number;
  to: number;

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona'];

  ngOnInit(): void {
    this.photos$.subscribe({
      next: (photos) => this.updateAvailableYears(photos)
    })
  }

  private updateAvailableYears(photos: Photo[]): void {
    let years: number[] = [];
    for (const photo of photos) {
      console.log('GalleryDateFilterComponent updateAvailableYears: ', photo.recordDate);
      console.log('GalleryDateFilterComponent updateAvailableYears: ', new Date(photo.recordDate));
      years.push(new Date(photo.recordDate).getFullYear());
    }
    years = Array.from(new Set(years))
    years.sort(function (a, b) {
      return a - b;
    });
    this.years = years;
    this.from = years[0];
    this.to = years[years.length - 1];
  }

  onChangeFrom($event: MatSelectChange): void {

  }
}
