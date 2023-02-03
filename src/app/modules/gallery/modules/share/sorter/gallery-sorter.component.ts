import { Component } from '@angular/core';
import { MatSelectChange } from "@angular/material/select";

interface Sort {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gallery-sorter',
  templateUrl: './gallery-sorter.component.html',
  styleUrls: ['./gallery-sorter.component.scss']
})
export class GallerySorterComponent {

  sorts: Sort[] = [
    {value: 'date-new', viewValue: 'Neueste'},
    {value: 'date-old', viewValue: 'Älteste'},
    {value: 'star', viewValue: 'Bewertung'},
  ];

  selected = this.sorts[0]

  onChangeSorting($event: MatSelectChange): void {
    console.log('SorterComponent onChangeSorting: ', $event)
  }
}
