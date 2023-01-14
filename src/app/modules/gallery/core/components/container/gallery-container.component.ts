import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { LinkAndName } from "@app/common/interfaces/link-and-names";

@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss'],
})
export class GalleryContainerComponent implements OnInit {

  linksAndNames: LinkAndName[] = [
    {name: 'Home', link: '/gallery/home'},
    {name: 'Explorer', link: '/gallery/explorer/finder'},
    {name: 'Editor', link: '/gallery/explorer/editor'},
    {name: 'Slideshow', link: '/gallery/slideshow'},
    {name: 'Lightbox', link: '/gallery/lightbox'},
    {name: 'Upload', link: '/gallery/upload'},
  ];

  activeLink = this.linksAndNames[0].link;

  constructor(private router: Router,
              private location: Location,
  ) { }

  ngOnInit(): void {
    this.activeLink = this.location.path();
    this.location.onUrlChange(url => this.activeLink = url);
  }

  navigateUrl(link: string): void {
    void this.router.navigateByUrl(link);
  }

}
