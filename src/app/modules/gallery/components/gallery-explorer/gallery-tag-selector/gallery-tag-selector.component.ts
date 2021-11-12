import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '@gallery/store/tags/tag.model';

@Component({
  selector: 'app-gallery-tag-selector',
  templateUrl: './gallery-tag-selector.component.html',
  styleUrls: ['./gallery-tag-selector.component.scss']
})
export class GalleryTagSelectorComponent implements OnInit {

  @Input() tag: Tag;

  constructor() {
  }

  ngOnInit(): void {
  }

  addEntry(): void {
  }
}
