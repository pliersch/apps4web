import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Route, Router } from "@angular/router";

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  routes: Route[] = [
    // {name: 'Meine Daten', path: '/account/profile', accepted: Role.User},
    // {name: 'Meine Photos', path: '/account/photos', accepted: Role.User},
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
