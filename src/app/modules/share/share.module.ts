import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardNoHeaderImgMarginFixDirective} from '@app/modules/share/directives/card-no-header-img-margin-fix.directive';
import {ButtonGroupComponent} from './components/button-group/button-group.component';
import {TabNoHeaderDirective} from "@modules/share/directives/tab-no-header.directive";


@NgModule({
  declarations: [
    CardNoHeaderImgMarginFixDirective,
    TabNoHeaderDirective,
    ButtonGroupComponent
  ],
  exports: [
    CardNoHeaderImgMarginFixDirective,
    TabNoHeaderDirective,
    ButtonGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule {}
