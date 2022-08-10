import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GalleryContainerComponent
} from '@app/modules/gallery/components/core/container/gallery-container.component';
import { GalleryExplorerComponent } from '@app/modules/gallery/components/explorer/gallery-explorer.component';
import { GalleryHomeComponent } from '@app/modules/gallery/components/home/gallery-home.component';
import { GalleryLightboxComponent } from '@app/modules/gallery/components/lightbox/gallery-lightbox.component';
import { GalleryUploadComponent } from '@app/modules/gallery/components/upload/gallery-upload.component';
import { GalleryResolverService } from "@gallery/services/gallery-resolver.service";
import { GallerySlideshowComponent } from "@gallery/components/slideshow/gallery-slideshow.component";

const routes: Routes = [
  {
    path: '', component: GalleryContainerComponent, resolve: {meta: GalleryResolverService},
    children: [
      {path: '', component: GalleryHomeComponent},
      {path: 'home', component: GalleryHomeComponent},
      {path: 'explorer', component: GalleryExplorerComponent},
      {path: 'lightbox', component: GalleryLightboxComponent},
      {path: 'slideshow', component: GallerySlideshowComponent},
      {path: 'upload', component: GalleryUploadComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
