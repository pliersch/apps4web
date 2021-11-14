import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {DashboardComponent} from "@modules/dashboard/dashboard.component";
import {LegalNoticeComponent} from "@modules/legal-notice/legal-notice.component";

const accountModule = () => import('@app/modules/account/account.module').then((x) => x.AccountModule);
const adminModule = () => import('@app/modules/admin/admin.module').then((x) => x.AdminModule);
const recipesModule = () => import('@app/modules/recipes/recipes.module').then((x) => x.RecipesModule);
const fooModule = () => import('@app/modules/foo/foo.module').then((x) => x.FooModule);
const profileModule = () => import('@app/modules/profile/profile.module').then((x) => x.ProfileModule);
const galleryModule = () => import('@app/modules/gallery/gallery.module').then((x) => x.GalleryModule);

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'impressum', component: LegalNoticeComponent },
      // { path: 'address', component: AddressFormComponent },
      { path: 'gallery', loadChildren: galleryModule },
      { path: 'foo', loadChildren: fooModule },
      { path: 'admin', loadChildren: adminModule },
      { path: 'recipes', loadChildren: recipesModule },
      { path: 'profile', loadChildren: profileModule },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
