import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardNoHeaderImgMarginFixDirective} from '@app/modules/share/directives/card-no-header-img-margin-fix.directive';
import {ButtonGroupComponent} from './components/button-group/button-group.component';
import {TabNoHeaderDirective} from "@modules/share/directives/tab-no-header.directive";
import {ImageFallbackDirective} from "@modules/share/directives/image-fallback-directive";


@NgModule({
  declarations: [
    CardNoHeaderImgMarginFixDirective,
    TabNoHeaderDirective,
    ButtonGroupComponent,
    ImageFallbackDirective,
  ],
  exports: [
    CardNoHeaderImgMarginFixDirective,
    TabNoHeaderDirective,
    ButtonGroupComponent,
    ImageFallbackDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule {}
