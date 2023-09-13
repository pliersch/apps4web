import { Route } from '@angular/router';
import { PhotosComponent } from '@modules/photos/core/components/container/photos.component';
import { PhotosResolver } from "@modules/photos/resolver/photos.resolver";

// const homeComponent = () => import('./modules/home/photos-home.component').then((x) => x.PhotosHomeComponent);
const uploadComponent = () => import('./modules/upload/photos-upload.component').then((x) => x.PhotosUploadComponent);
const slideshowComponent = () => import('./modules/slideshow/photos-slideshow.component').then((x) => x.PhotosSlideshowComponent);
const lightBoxComponent = () => import('./modules/lightbox/photos-lightbox.component').then((x) => x.PhotosLightboxComponent);
const explorerComponent = () => import('./modules/explorer/pages/explorer/photos-explorer.component').then((x) => x.PhotosExplorerComponent);
const editorComponent = () => import('./modules/explorer/pages/editor/photos-editor.component').then((x) => x.PhotosEditorComponent);

export default [
  {
    path: '', component: PhotosComponent, resolve: {meta: PhotosResolver},
    children: [
      // {path: 'home', title: 'Home', loadComponent: homeComponent},
      {path: 'explorer/finder', title: 'Photo Explorer', loadComponent: editorComponent},
      {path: 'explorer/editor', title: 'Photo Explorer', loadComponent: explorerComponent},
      {path: 'upload', title: 'Photo Upload', loadComponent: uploadComponent},
      {path: 'slideshow/:id', title: 'Photo Slideshow', loadComponent: slideshowComponent},
      {path: 'lightbox', title: 'Photo Lightbox', loadComponent: lightBoxComponent},
      {path: '**', redirectTo: '/photos/explorer/finder', pathMatch: 'full'},
      {path: '', redirectTo: '/photos/explorer/finder', pathMatch: 'full'},
    ]
  }
] as Route[];

