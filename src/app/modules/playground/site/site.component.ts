import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SimpleAppBarComponent } from "@app/library/components/toolbars/appbar/simple-app-bar.component";
import { ControlComponent } from "@modules/playground/control/control.component";

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule, SimpleAppBarComponent, ControlComponent],
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {

}
