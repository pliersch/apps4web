import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";

export enum SortMode {
  Newest,
  Oldest,
  HighestRating,
  LowestRating,
}

interface Sort {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-gallery-sorter',
  templateUrl: './gallery-sorter.component.html',
  styleUrls: ['./gallery-sorter.component.scss']
})
export class GallerySorterComponent {

  @Output()
  sortEvent = new EventEmitter<SortMode>();

  sorts: Sort[] = [
    {value: SortMode.Newest, viewValue: 'Neueste'},
    {value: SortMode.Oldest, viewValue: 'Älteste'},
    {value: SortMode.HighestRating, viewValue: 'Beste Bewertung'},
    {value: SortMode.LowestRating, viewValue: 'Mieseste Bewertung'},
  ];

  selected = this.sorts[0]

  onChangeSorting($event: MatSelectChange): void {
    this.sortEvent.emit($event.value)
  }
}
