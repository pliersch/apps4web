import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SiteComponent } from "@modules/playground/site/site.component";
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, NgScrollbar, SiteComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

}
