import { Component, Input, OnInit } from '@angular/core';
import { Photo } from "@gallery/store/photos/photo.model";
import { getW300Url, getW600Url, getW900Url } from "@gallery/store/photos/photo.tools";

@Component({
  selector: 'app-gallery-highlight',
  templateUrl: './gallery-highlight.component.html',
  styleUrls: ['./gallery-highlight.component.scss']
})

export class GalleryHighlightComponent implements OnInit {

  @Input()
  photo: Photo;

  src800: string;
  src1200: string;
  src1900: string;

  ngOnInit(): void {
    this.src800 = getW300Url(this.photo.fileName);
    this.src1200 = getW600Url(this.photo.fileName);
    this.src1900 = getW900Url(this.photo.fileName);
  }
}
