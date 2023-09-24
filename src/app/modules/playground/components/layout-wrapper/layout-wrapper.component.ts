import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [CommonModule, DynamicComponent, MatButtonModule],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent {

  dynamicComponentNames: string[] = [];
  count = 0;
  locked = false;

  onClickAddComponent(): void {
    this.locked = true;
    this.dynamicComponentNames.push('dyn' + this.count++);

  }
}
