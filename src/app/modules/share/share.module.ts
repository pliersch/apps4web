import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNoHeaderImgMarginFixDirective } from '@app/modules/share/directives/card-no-header-img-margin-fix.directive';


@NgModule({
  declarations: [
    CardNoHeaderImgMarginFixDirective
  ],
  exports: [
    CardNoHeaderImgMarginFixDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
