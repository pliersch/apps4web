﻿import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Route } from "@app/core/stores/routes/router.state";
import { Role } from "@modules/admin/modules/user/store/role";
import { AccountProfileComponent } from "./components/profile/account-profile.component";

@Component({
  templateUrl: 'account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [AccountProfileComponent]
})
export class AccountComponent implements OnInit {

  routes: Route[] = [
    {name: 'Meine Daten', path: '/account/profile', accepted: Role.User},
    {name: 'Meine Photos', path: '/account/photos', accepted: Role.User},
  ];

  activeLink = this.routes[0].path;

  constructor(private router: Router,
              private location: Location,
  ) { }

  ngOnInit(): void {
    this.activeLink = this.location.path();
    this.location.onUrlChange(url => this.activeLink = url);
  }

  // navigateUrl(url: string): void {
  //   void this.router.navigateByUrl(url);
  // }

}
