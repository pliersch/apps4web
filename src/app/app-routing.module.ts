import { AuthGuard } from "@account/guards/auth.guard";
import { importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertService } from "@app/common/services/alert.service";
import { AdminGuard } from "@modules/admin/guards/admin-guard.service";
import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { ChatResolver } from "@modules/chat/resolver/chat.resolver";
import { ChatService } from "@modules/chat/services/chat.service";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { NgxsModule } from "@ngxs/store";
import { DefaultLayoutComponent } from "./core/layouts/default-layout/default-layout.component";

const photosModule = () => import('@modules/photos/photos.module').then((x) => x.PhotosModule);
const accountModule = () => import('@app/modules/account/account.module').then((x) => x.AccountModule);
const adminRoutes = import('@modules/admin/admin-routes');
// const adminComponent = import('@modules/admin/admin.component').then(x => x.AdminComponent);
const three = import('@modules/three/three.component').then(x => x.ThreeComponent);
const chat = import('@app/modules/chat/chat.component').then(x => x.ChatComponent);

const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, providers: [AlertService], children: [
    {path: '', title: 'Home', component: DashboardComponent},
    // {path: 'impressum', title: 'Impressum', component: LegalNoticeComponent},
    // {path: 'error', title: 'Error', component: ErrorComponent},
    {
      path: 'chat',
      title: 'Chat',
      loadComponent: () => chat,
      providers: [ChatService],
      resolve: {data: ChatResolver},
      canActivate: [AuthGuard]
    },
    {
      path: 'admin',
      // loadComponent: () => adminComponent,
      // component: AdminComponent,
      loadChildren: () => adminRoutes,
      title: 'Administration',
      canActivate: [AdminGuard],
      providers: [
        importProvidersFrom(
          NgxsModule.forFeature([UserState, ProtocolState])
        )
      ]
    },
    {path: 'photos', title: 'Photos', loadChildren: photosModule, canActivate: [AuthGuard]},
    {path: 'three', title: 'ThreeJS', loadComponent: () => three, canActivate: [AuthGuard]},
    {path: 'account', title: 'Account', loadChildren: accountModule},
    {path: '**', redirectTo: '', pathMatch: 'full'},
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: 'login', redirectTo: 'account/login', pathMatch: 'full'},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
