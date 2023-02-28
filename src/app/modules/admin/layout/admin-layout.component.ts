import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LinkAndName } from "@app/core/interfaces/link-and-names";

@Component({templateUrl: 'admin-layout.component.html'})

export class AdminLayoutComponent implements OnInit {

  linksAndNames: LinkAndName[] = [
    {name: 'User', link: '/admin/user'},
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
