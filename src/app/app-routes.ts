import { AuthGuard } from "@account/guards/auth.guard";
import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
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

const adminRoutes = () => import('@modules/admin/admin-routes');
const accountRoutes = () => import('@modules/account/account-routes');
const photosRoutes = () => import('@modules/photos/photos-routes');
const three = () => import('@modules/three/three.component').then(x => x.ThreeComponent);
const playground = () => import('@modules/playground/playground.component').then(x => x.PlaygroundComponent);
const chat = () => import('@app/modules/chat/chat.component').then(x => x.ChatComponent);

export const ROUTES: Route[] = [
  {
    path: '', component: DefaultLayoutComponent, children: [
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
        loadChildren: adminRoutes,
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
        loadChildren: photosRoutes,
        title: 'Photos',
        canActivate: [AuthGuard],
        providers: [
          TagService, PhotoService, PhotosResolver,
          importProvidersFrom(
            NgxsModule.forFeature([PhotoState, TagState])
          )
        ]
      },
      {path: 'three', title: 'ThreeJS', loadComponent: three, canActivate: [AuthGuard]},
      {path: 'account', title: 'Account', loadChildren: accountRoutes},
      {path: 'playground', title: 'Playground', loadComponent: playground},
      {path: 'login', redirectTo: 'account/login', pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'},
      {path: '', redirectTo: '', pathMatch: 'full'},
    ]
  }];
