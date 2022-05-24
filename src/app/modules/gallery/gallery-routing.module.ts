import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GalleryContainerComponent
} from '@app/modules/gallery/components/core/gallery-container/gallery-container.component';
import { GalleryExplorerComponent } from '@app/modules/gallery/components/gallery-explorer/gallery-explorer.component';
import { GalleryHomeComponent } from '@app/modules/gallery/components/gallery-home/gallery-home.component';
import { GalleryLightboxComponent } from '@app/modules/gallery/components/gallery-lightbox/gallery-lightbox.component';
import { GalleryUploadComponent } from '@app/modules/gallery/components/gallery-upload/gallery-upload.component';
import { GalleryResolverService } from "@gallery/services/gallery-resolver.service";

const routes: Routes = [
  {
    path: '', component: GalleryContainerComponent, resolve: {meta: GalleryResolverService},
    children: [
      {path: '', component: GalleryHomeComponent},
      {path: 'home', component: GalleryHomeComponent},
      {path: 'explorer', component: GalleryExplorerComponent/*, resolve: {photos: PhotosResolver}*/},
      {path: 'lightbox', component: GalleryLightboxComponent},
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
