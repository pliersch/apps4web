import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { LazyComponent } from "@modules/login/lazy.component";
import { LazyState } from "@modules/login/lazy.state";

const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([LazyState])
  ],
})
export class LoginModule {}
