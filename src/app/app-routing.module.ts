import { AuthGuard } from "@account/guards/auth.guard";
import { importProvidersFrom, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertService } from "@app/common/services/alert.service";
import { AdminGuard } from "@modules/admin/guards/admin.guard";
import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { ChatResolver } from "@modules/chat/resolver/chat.resolver";
import { ChatService } from "@modules/chat/services/chat.service";
import { ChatState } from "@modules/chat/store/chat.state";
import { DashboardComponent } from "@modules/dashboard/dashboard.component";
import { PhotosResolver } from "@modules/photos/resolver/photos.resolver";
import { PhotoService } from "@modules/photos/services/photo.service";
import { TagService } from "@modules/photos/services/tag.service";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { TagState } from "@modules/photos/store/tags/tag.state";
import { NgxsModule } from "@ngxs/store";
import { DefaultLayoutComponent } from "./core/layouts/default-layout/default-layout.component";

const adminRoutes = import('@modules/admin/admin-routes');
const photosRoutes = import('@modules/photos/photos-routes');
const accountComponent = () => import('@app/modules/account/account.component').then((x) => x.AccountComponent);
// const adminComponent = import('@modules/admin/admin.component').then(x => x.AdminComponent);
const three = () => import('@modules/three/three.component').then(x => x.ThreeComponent);
const chat = () => import('@app/modules/chat/chat.component').then(x => x.ChatComponent);

const routes: Routes = [{
  path: '', component: DefaultLayoutComponent, providers: [AlertService], children: [
    {path: '', title: 'Home', component: DashboardComponent},
    // {path: 'impressum', title: 'Impressum', component: LegalNoticeComponent},
    // {path: 'error', title: 'Error', component: ErrorComponent},
    {
      path: 'chat',
      title: 'Chat',
      loadComponent: chat,
      providers: [ChatService, importProvidersFrom(
        NgxsModule.forFeature([ChatState])
      )],
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
          NgxsModule.forFeature([UserState, ProtocolState, PhotoState])
        )
      ]
    },
    {
      path: 'photos',
      // loadComponent: () => adminComponent,
      // component: AdminComponent,
      loadChildren: () => photosRoutes,
      title: 'Photos',
      canActivate: [AuthGuard],
      providers: [
        TagService, PhotoService, PhotosResolver,
        importProvidersFrom(
          NgxsModule.forFeature([PhotoState, TagState])
        )
      ]
    },
    // {path: 'photos', title: 'Photos', loadChildren: photosModule, canActivate: [AuthGuard]},
    {path: 'three', title: 'ThreeJS', loadComponent: three, canActivate: [AuthGuard]},
    {path: 'account', title: 'Account', loadComponent: accountComponent},
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
