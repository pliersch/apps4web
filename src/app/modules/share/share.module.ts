import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardNoHeaderImgMarginFixDirective
} from '@app/modules/share/directives/card-no-header-img-margin-fix.directive';
import { ImageFallbackDirective } from "@modules/share/directives/image-fallback-directive";
import { MatButtonLoadingDirective } from "@modules/share/directives/mat-button-loading.directive";
import { MatListRemovePaddingDirective } from "@modules/share/directives/mat-list-remove-padding.directive";
import { TabNoHeaderDirective } from "@modules/share/directives/tab-no-header.directive";
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    CardNoHeaderImgMarginFixDirective,
    TabNoHeaderDirective,
    ImageFallbackDirective,
    MatButtonLoadingDirective,
    MatListRemovePaddingDirective,
    FocusDirective
  ],
  exports: [
    CardNoHeaderImgMarginFixDirective,
    TabNoHeaderDirective,
    ImageFallbackDirective,
    MatButtonLoadingDirective,
    MatListRemovePaddingDirective,
    FocusDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule {}
