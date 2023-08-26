import { Component, Input } from '@angular/core';
import { Photo } from "@modules/photos/store/photos/photo.model";
import { Observable } from "rxjs";

@Component({
  selector: 'app-slide-show-control-bar',
  templateUrl: './slide-show-control-bar.component.html',
  styleUrls: ['./slide-show-control-bar.component.scss']
})
export class SlideShowControlBarComponent {

  @Input()
  photo$: Observable<Photo>;
}
