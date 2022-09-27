import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-date-filter',
  templateUrl: './gallery-date-filter.component.html',
  styleUrls: ['./gallery-date-filter.component.scss']
})
export class GalleryDateFilterComponent implements OnInit {

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona'];

  constructor() { }

  ngOnInit(): void {
  }

}
