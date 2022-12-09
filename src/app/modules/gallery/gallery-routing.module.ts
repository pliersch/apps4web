import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryContainerComponent } from '@app/modules/gallery/components/core/container/gallery-container.component';
import { GalleryExplorerComponent } from '@app/modules/gallery/components/explorer/gallery-explorer.component';
import { GalleryLightboxComponent } from '@app/modules/gallery/components/lightbox/gallery-lightbox.component';
import { GalleryUploadComponent } from '@app/modules/gallery/components/upload/gallery-upload.component';
import { GallerySlideshowComponent } from "@gallery/components/slideshow/gallery-slideshow.component";
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { GalleryEditorComponent } from "@gallery/components/editor/gallery-editor.component";
import { GalleryHomeComponent } from '@app/modules/gallery/components/home/gallery-home.component';

const routes: Routes = [
  {
    path: '', component: GalleryContainerComponent, resolve: {meta: GalleryResolver},
    children: [
      {path: 'home', component: GalleryHomeComponent},
      {path: 'explorer', title: 'Explorer', component: GalleryExplorerComponent},
      {path: 'editor', title: 'Editor', component: GalleryEditorComponent},
      {path: 'lightbox', title: 'Lightbox', component: GalleryLightboxComponent},
      {path: 'slideshow', title: 'Slideshow', component: GallerySlideshowComponent},
      {path: 'upload', title: 'Upload', component: GalleryUploadComponent},
      {path: '**', component: GalleryHomeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
