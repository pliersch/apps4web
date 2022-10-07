import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { MaterialModule } from "@app/shared/material/material.module";

// const routes: Routes = [{
//   path: '', component: SigninComponent,
// }];

@NgModule({
  declarations: [
    SigninComponent
  ],
  exports: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class GoogleSigninModule {}
