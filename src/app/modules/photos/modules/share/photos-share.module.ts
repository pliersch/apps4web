import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ExplorerInstructionDialogComponent
} from '@modules/photos/modules/explorer/components/explorer-instruction-dialog/explorer-instruction-dialog.component';
import { PhotosSorterComponent } from '@modules/photos/modules/explorer/components/sorter/photos-sorter.component';
import {
  PhotosHorizontalScrollerComponent,
  PhotosImagePlaceholderComponent,
  PhotosVerticalScrollerComponent,
  ScrollerItemComponent,
  StarRatingComponent
} from "@modules/photos/modules/share/index";
import { MaterialModule } from "@modules/share";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
    PhotosHorizontalScrollerComponent,
    PhotosVerticalScrollerComponent,
    ScrollerItemComponent,
    PhotosImagePlaceholderComponent,
    StarRatingComponent,
    PhotosSorterComponent,
    ExplorerInstructionDialogComponent,
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    MaterialModule,
  ],
  exports: [
    PhotosHorizontalScrollerComponent,
    PhotosVerticalScrollerComponent,
    StarRatingComponent,
    PhotosSorterComponent,
  ]
})
export class PhotosShareModule {}
