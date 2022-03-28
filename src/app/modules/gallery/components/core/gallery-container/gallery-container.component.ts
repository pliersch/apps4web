import {Component, OnInit} from '@angular/core';
import {GalleryToolbarComponent} from "@gallery/components/core/gallery-toolbar/gallery-toolbar.component";
import {DynamicAppbarService} from "@modules/app-bar/dynamic/dynamic-appbar.service";
import {Store} from "@ngxs/store";
import {LoadPhotosAction} from "@gallery/store/photos/photo-actions";
import {ModuleComponent} from "@app/core/base-components/module/module.component";

@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss'],
})
export class GalleryContainerComponent extends ModuleComponent implements OnInit {

  constructor(private appbarService: DynamicAppbarService,
              private store: Store) {
    super()
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPhotosAction());
    this.appbarService.registerAppbar({
      appbar: GalleryToolbarComponent,
      moduleName: 'gallery'
    });
  }
}
