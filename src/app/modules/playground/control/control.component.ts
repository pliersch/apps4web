import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ComponentChooserService } from "@modules/playground/common/services/component-chooser.service";

@Component({
  selector: 'lib-control',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  constructor(private componentService: ComponentChooserService) {
  }

  setAppbar(): void {
    this.componentService.setAppbar();
  }
}
