import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Route } from "@app/core/stores/routes/router.state";
import { Role } from "@modules/admin/modules/user/store/role";

@Component({
  selector: 'app-photos-container',
  templateUrl: './photos-container.component.html',
  styleUrls: ['./photos-container.component.scss'],
})
export class PhotosContainerComponent implements OnInit {

  // fixme Role ignored
  routes: Route[] = [
    // {name: 'Home', path: '/photos/home', accepted: Role.User},
    {name: 'Explorer', path: '/photos/explorer/finder', accepted: Role.User},
    {name: 'Editor', path: '/photos/explorer/editor', accepted: Role.User},
    {name: 'Slideshow', path: '/photos/slideshow', accepted: Role.User},
    {name: 'Lightbox', path: '/photos/lightbox', accepted: Role.User},
    //todo re-enable
    {name: 'Upload', path: '/photos/upload', accepted: Role.User},
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
