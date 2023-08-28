import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange, MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

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
    selector: 'app-photos-sorter',
    templateUrl: './photos-sorter.component.html',
    styleUrls: ['./photos-sorter.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatSelectModule, NgFor, MatOptionModule]
})
export class PhotosSorterComponent {

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
