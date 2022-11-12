import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "@modules/admin/layout/admin-layout.component";
import { UserLayoutComponent } from "@modules/admin/modules/user/layout/user-layout.component";
import { UserOverviewComponent } from "@modules/admin/modules/user/components/user-overview.component";

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent,
    children: [
      {path: '', component: UserOverviewComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
