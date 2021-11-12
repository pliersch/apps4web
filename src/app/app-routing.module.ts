import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {LegalNoticeComponent} from "@modules//legal-notice/legal-notice.component";

const galleryModule = () => import('@app/modules/gallery/gallery.module').then((x) => x.GalleryModule);

const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'impressum', component: LegalNoticeComponent },
      { path: 'gallery', loadChildren: galleryModule }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
