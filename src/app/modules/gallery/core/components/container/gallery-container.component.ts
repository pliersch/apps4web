import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss'],
})
export class GalleryContainerComponent implements OnInit {

  // fixme Role ignored
  routes: Route[] = [
    // {name: 'Home', path: '/gallery/home', accepted: Role.User},
    // {name: 'Explorer', path: '/gallery/explorer/finder', accepted: Role.User},
    // {name: 'Editor', path: '/gallery/explorer/editor', accepted: Role.User},
    // {name: 'Slideshow', path: '/gallery/slideshow', accepted: Role.User},
    // {name: 'Lightbox', path: '/gallery/lightbox', accepted: Role.User},
    //todo re-enable
    // {name: 'Upload', path: '/gallery/upload', accepted: Role.Admin},
  ];

  activeLink = this.routes[0].path;

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
