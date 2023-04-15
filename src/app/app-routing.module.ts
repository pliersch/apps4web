import { AuthGuard } from "@account/guards/auth.guard";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from "@app/core/components/error/error.component";
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { LegalNoticeComponent } from "@modules/legal-notice/legal-notice.component";
import { DefaultLayoutComponent } from "./core/layouts/default-layout/default-layout.component";

const galleryModule = () => import('@app/modules/gallery/gallery.module').then((x) => x.GalleryModule);
const accountModule = () => import('@app/modules/account/account.module').then((x) => x.AccountModule);
const adminModule = () => import('@modules/admin/admin.module').then((x) => x.AdminModule);
const threeModule = () => import('@app/modules/three/three.module').then((x) => x.ThreeModule);
const chatModule = () => import('@app/modules/chat/chat.module').then((x) => x.ChatModule);
// const recipesModule = () => import('@app/modules/recipes/recipes.module').then((x) => x.RecipesModule);
// const wasteModule = () => import('@app/modules/waste-calendar/waste-calendar.module').then((x) => x.WasteCalendarModule);

const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, children: [
    {path: '', title: 'Home', component: DashboardComponent},
    {path: 'impressum', title: 'Impressum', component: LegalNoticeComponent},
    {path: 'error', title: 'Error', component: ErrorComponent},
    {path: 'chat', title: 'Chat', loadChildren: chatModule, canActivate: [AuthGuard]},
    {path: 'admin', title: 'Administration', loadChildren: adminModule, canActivate: [AdminGuard]},
    {path: 'gallery', title: 'Photo Galerie', loadChildren: galleryModule, canActivate: [AuthGuard]},
    {path: 'three', title: 'ThreeJS Playground', loadChildren: threeModule, canActivate: [AuthGuard]},
    {path: 'account', title: 'Account Info', loadChildren: accountModule},
    // {path: 'waste', loadChildren: wasteModule},
    // {path: 'recipes', loadChildren: recipesModule},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
