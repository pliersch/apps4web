import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Route, Router } from "@angular/router";

@Component({templateUrl: 'admin-layout.component.html'})

export class AdminLayoutComponent implements OnInit {

  routes: Route[] = [
    // {name: 'User', path: '/admin/user', accepted: Role.Admin},
    // {name: 'Photos', path: '/admin/photos', accepted: Role.Admin},
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
