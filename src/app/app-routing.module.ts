import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: [
      { path: '', component: DashboardComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
