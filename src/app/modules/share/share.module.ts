import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardNoHeaderImgMarginFixDirective} from '@app/modules/share/directives/card-no-header-img-margin-fix.directive';
import {ButtonGroupComponent} from './components/button-group/button-group.component';


@NgModule({
  declarations: [
    CardNoHeaderImgMarginFixDirective,
    ButtonGroupComponent
  ],
  exports: [
    CardNoHeaderImgMarginFixDirective,
    ButtonGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule {}
