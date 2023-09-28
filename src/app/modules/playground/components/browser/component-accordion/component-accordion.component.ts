import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-component-accordion',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './component-accordion.component.html',
  styleUrls: ['./component-accordion.component.scss']
})
export class ComponentAccordionComponent {

  panelOpenState = false;
}
