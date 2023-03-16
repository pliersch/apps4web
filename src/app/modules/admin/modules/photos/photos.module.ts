import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { PhotosLayoutComponent } from "@modules/admin/modules/photos/layout/photos-layout.component";
import { PhotosOverviewComponent } from './components/photos-overview.component';

@NgModule({
  declarations: [
    PhotosLayoutComponent,
    PhotosOverviewComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet
  ]
})
export class PhotosModule {}
