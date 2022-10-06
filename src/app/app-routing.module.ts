import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { LegalNoticeComponent } from "@modules/legal-notice/legal-notice.component";

// const authModule = () => import('@app/modules/auth/auth.module').then((x) => x.AuthModule);
const chatModule = () => import('@app/modules/chat/chat.module').then((x) => x.ChatModule);
// const adminModule = () => import('@app/modules/admin/admin.module').then((x) => x.AdminModule);
// const doctorModule = () => import('@app/modules/doctor/doctor.module').then((x) => x.DoctorModule);
// const accountModule = () => import('@app/modules/account/account.module').then((x) => x.AccountModule);
// const recipesModule = () => import('@app/modules/recipes/recipes.module').then((x) => x.RecipesModule);
// const samplesModule = () => import('@app/modules/samples/samples.module').then((x) => x.SamplesModule);
const profileModule = () => import('@app/modules/profile/profile.module').then((x) => x.ProfileModule);
const galleryModule = () => import('@app/modules/gallery/gallery.module').then((x) => x.GalleryModule);
const threeModule = () => import('@app/modules/three/three.module').then((x) => x.ThreeModule);
const googleSignInModule = () => import('@app/modules/google-signin/google-signin.module').then((x) => x.GoogleSigninModule);
// const wasteModule = () => import('@app/modules/waste-calendar/waste-calendar.module').then((x) => x.WasteCalendarModule);

const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, children: [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'impressum', component: LegalNoticeComponent},
    // {path: 'auth', loadChildren: authModule},
    {path: 'chat', loadChildren: chatModule},
    // {path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard]},
    // {path: 'waste', loadChildren: wasteModule},
    // {path: 'felix', loadChildren: doctorModule},
    {path: 'gallery', loadChildren: galleryModule},
    // {path: 'account', loadChildren: accountModule},
    // {path: 'samples', loadChildren: samplesModule},
    // {path: 'recipes', loadChildren: recipesModule},
    {path: 'profile', loadChildren: profileModule},
    {path: 'three', loadChildren: threeModule},
    {path: 'signin', loadChildren: googleSignInModule},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
