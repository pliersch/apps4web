import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "@modules/admin/layout.component";
import { UserMangerLayoutComponent } from "@modules/admin/modules/user/layout/user-manger-layout.component";
import { UserOverviewComponent } from "@modules/admin/modules/user/components/user-overview.component";

const routes: Routes = [
  {
    path: '', component: UserMangerLayoutComponent,
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
