import { Location, NgFor } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from "@angular/material/tabs";
import { Router, RouterOutlet } from "@angular/router";
import { Route } from "@app/core/stores/routes/router.state";
import { Role } from "@modules/admin/modules/user/store/role";

@Component({
  selector: 'app-photos-container',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    NgFor,
    RouterOutlet,
  ],
})
export class PhotosComponent implements OnInit {

  // fixme Role ignored
  routes: Route[] = [
    // {name: 'Home', path: '/photos/home', accepted: Role.User},
    {name: 'Finder', path: '/photos/explorer/finder', accepted: Role.User},
    {name: 'Editor', path: '/photos/explorer/editor', accepted: Role.User},
    {name: 'Slideshow', path: '/photos/slideshow/:id', accepted: Role.User},
    {name: 'Lightbox', path: '/photos/lightbox', accepted: Role.User},
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

  navigateUrl(url: string): void {
    void this.router.navigateByUrl(url);
  }

}
