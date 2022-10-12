import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Store } from "@ngxs/store";

interface LinkAndName {
  link: string;
  name: string;
}

@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss'],
})
export class GalleryContainerComponent implements OnInit {

  linksAndNames: LinkAndName[] = [
    // {name: 'Home', link: '/gallery/home'},
    {name: 'Explorer', link: '/gallery/explorer'},
    {name: 'Slideshow', link: '/gallery/slideshow'},
    {name: 'Lightbox', link: '/gallery/lightbox'},
    {name: 'Upload', link: '/gallery/upload'},
  ];

  activeLink = this.linksAndNames[0].link;

  constructor(private router: Router,
              private location: Location,
              private store: Store,
  ) { }

  ngOnInit(): void {
    this.activeLink = this.location.path();
    this.location.onUrlChange(url => this.activeLink = url);
  }

  navigateUrl(link: string): void {
    void this.router.navigateByUrl(link);
  }

}
