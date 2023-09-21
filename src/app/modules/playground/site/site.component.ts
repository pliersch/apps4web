import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultLayoutComponent } from "@app/core/layouts/default-layout/default-layout.component";
import { SideNavComponent } from "@app/library/components/layouts/sidenav/side-nav.component";
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule, NgScrollbar, DefaultLayoutComponent, SideNavComponent],
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {

}
