import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin.component';
import { MaterialModule } from "@app/shared/material/material.module";
import { SigninService } from "@modules/google-signin/services/signin.service";

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
  ],
  providers: [SigninService]
})
export class GoogleSigninModule {}
