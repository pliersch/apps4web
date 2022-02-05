import {Component, OnInit} from '@angular/core';
import {GalleryToolbarComponent} from "@gallery/components/core/gallery-toolbar/gallery-toolbar.component";
import {DynamicAppbarService} from "@modules/app-bar/dynamic/dynamic-appbar.service";

@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss']
})
export class GalleryContainerComponent implements OnInit {

  constructor(private appbarService: DynamicAppbarService) {
  }

  ngOnInit(): void {
    this.appbarService.registerAppbar({
      appbar: GalleryToolbarComponent,
      moduleName: 'gallery'
    });
  }

}
