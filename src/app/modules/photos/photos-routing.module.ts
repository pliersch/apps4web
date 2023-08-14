import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";
import { PhotosContainerComponent } from '@modules/photos/core/components/container/photos-container.component';
import { PhotosResolver } from "@modules/photos/resolver/photos-resolver.service";

// const homeModule = () => import('./modules/home/home.module').then((x) => x.HomeModule);
const uploadModule = () => import('./modules/upload/upload.module').then((x) => x.UploadModule);
const slideShowModule = () => import('./modules/slideshow/slideshow.module').then((x) => x.SlideshowModule);
const lightBoxModule = () => import('./modules/lightbox/lightbox.module').then((x) => x.LightboxModule);
const explorerModule = () => import('./modules/explorer/explorer.module').then((x) => x.ExplorerModule);

const routes: Routes = [
  {
    path: '', component: PhotosContainerComponent, resolve: {meta: PhotosResolver},
    children: [
      // {path: 'home', title: 'Home', loadChildren: homeModule},
      {path: 'explorer', title: 'Explorer', loadChildren: explorerModule},
      {path: 'upload', title: 'Upload', loadChildren: uploadModule, canActivate: [AdminGuard]},
      {path: 'slideshow', title: 'Slideshow', loadChildren: slideShowModule},
      {path: 'lightbox', title: 'Lightbox', loadChildren: lightBoxModule},
      {path: '**', redirectTo: '/photos/explorer/finder', pathMatch: 'full'},
      {path: '', redirectTo: '/photos/explorer/finder', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule {
}
