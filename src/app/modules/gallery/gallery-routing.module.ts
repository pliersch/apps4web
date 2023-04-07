import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryContainerComponent } from '@app/modules/gallery/core/components/container/gallery-container.component';
import { GalleryResolver } from "@gallery/resolver/gallery.resolver";
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";

const homeModule = () => import('./modules/home/home.module').then((x) => x.HomeModule);
const uploadModule = () => import('./modules/upload/upload.module').then((x) => x.UploadModule);
const slideShowModule = () => import('./modules/slideshow/slideshow.module').then((x) => x.SlideshowModule);
const lightBoxModule = () => import('./modules/lightbox/lightbox.module').then((x) => x.LightboxModule);
const explorerModule = () => import('./modules/explorer/explorer.module').then((x) => x.ExplorerModule);

const routes: Routes = [
  {
    path: '', component: GalleryContainerComponent, resolve: {meta: GalleryResolver},
    children: [
      {path: 'home', title: 'Home', loadChildren: homeModule},
      {path: 'upload', title: 'Upload', loadChildren: uploadModule, canActivate: [AdminGuard]},
      {path: 'slideshow', title: 'Slideshow', loadChildren: slideShowModule},
      {path: 'lightbox', title: 'Lightbox', loadChildren: lightBoxModule},
      {path: 'explorer', title: 'Explorer', loadChildren: explorerModule},
      // {path: 'editor', title: 'Editor', loadChildren: explorerModule},
      {path: '**', redirectTo: '/gallery/home', pathMatch: 'full'},
      {path: '', redirectTo: '/gallery/home', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
