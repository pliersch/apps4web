import { AuthGuard } from "@account/guards/auth.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { DefaultLayoutComponent } from "./core/layouts/default-layout/default-layout.component";

const photosModule = () => import('@modules/photos/photos.module').then((x) => x.PhotosModule);
const accountModule = () => import('@app/modules/account/account.module').then((x) => x.AccountModule);
const adminModule = () => import('@modules/admin/admin.module').then((x) => x.AdminModule);
const threeModule = () => import('@app/modules/three/three.module').then((x) => x.ThreeModule);
const chatModule = () => import('@app/modules/chat/chat.module').then((x) => x.ChatModule);

const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, children: [
    {path: '', title: 'Home', component: DashboardComponent},
    // {path: 'impressum', title: 'Impressum', component: LegalNoticeComponent},
    // {path: 'error', title: 'Error', component: ErrorComponent},
    {path: 'chat', title: 'Chat', loadChildren: chatModule, canActivate: [AuthGuard]},
    {path: 'admin', title: 'Administration', loadChildren: adminModule, canActivate: [AdminGuard]},
    {path: 'photos', title: 'Photos', loadChildren: photosModule, canActivate: [AuthGuard]},
    {path: 'three', title: 'ThreeJS Playground', loadChildren: threeModule, canActivate: [AuthGuard]},
    {path: 'account', title: 'Account Info', loadChildren: accountModule},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
