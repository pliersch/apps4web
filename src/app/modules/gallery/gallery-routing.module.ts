import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryContainerComponent } from '@app/modules/gallery/components/core/container/gallery-container.component';
import { GalleryExplorerComponent } from '@app/modules/gallery/components/explorer/gallery-explorer.component';
import { GalleryLightboxComponent } from '@app/modules/gallery/components/lightbox/gallery-lightbox.component';
import { GalleryUploadComponent } from '@app/modules/gallery/components/upload/gallery-upload.component';
import { GallerySlideshowComponent } from "@gallery/components/slideshow/gallery-slideshow.component";
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { GalleryEditorComponent } from "@gallery/components/editor/gallery-editor.component";
// import { GalleryHomeComponent } from '@app/modules/gallery/components/home/gallery-home.component';

const routes: Routes = [
  {
    path: '', component: GalleryContainerComponent, resolve: {meta: GalleryResolver},
    children: [
      {path: '', component: GalleryExplorerComponent},
      // {path: 'home', component: GalleryHomeComponent},
      {path: 'explorer', component: GalleryExplorerComponent},
      {path: 'editor', component: GalleryEditorComponent},
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
