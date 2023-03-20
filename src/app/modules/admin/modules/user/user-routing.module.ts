import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOverviewComponent } from "@modules/admin/modules/user/components/user-overview.component";

const routes: Routes = [
  {
    path: '', component: UserOverviewComponent,
  }
];
// const routes: Routes = [
//   {
//     path: '', component: UserLayoutComponent,
//     children: [
//       {path: '', component: UserOverviewComponent},
//       {path: '**', component: UserOverviewComponent},
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
