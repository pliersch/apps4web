import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, DynamicComponent],
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {

}
