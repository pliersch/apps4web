import { Route } from '@angular/router';
import { AdminComponent } from "@modules/admin/admin.component";
import { AdminProtocolResolver } from "@modules/admin/modules/protocol/resolver/admin-protocol.resolver";
import { AdminUserResolver } from "@modules/admin/modules/user/resolver/admin-user.resolver";
import { PhotosAdminResolver } from "@modules/photos/modules/admin/resolver/photos-admin.resolver";

const userAdmin = () => import('./modules/user/user-admin.component').then((x) => x.UserAdminComponent);
const protocolAdmin = () => import('./modules/protocol/admin-protocol.component').then((x) => x.AdminProtocolComponent);
const chatAdmin = () => import('./modules/chat/admin-chat.component').then((x) => x.AdminChatComponent);
const photosAdmin = () => import('@modules/photos/modules/admin/photos-admin.component').then((x) => x.PhotosAdminComponent);

export default [
  {
    path: '', component: AdminComponent, children: [
      {path: 'user', title: 'Admin User', resolve: {resolver: AdminUserResolver}, loadComponent: userAdmin},
      {path: 'visits', title: 'Admin Visits', resolve: {resolver: AdminProtocolResolver}, loadComponent: protocolAdmin},
      {path: 'photos', title: 'Admin Photos', resolve: {resolver: PhotosAdminResolver}, loadComponent: photosAdmin},
      {path: 'chat', title: 'Admin Chat', loadComponent: chatAdmin},
      {path: '**', redirectTo: 'user', pathMatch: 'prefix'},
      {path: '', redirectTo: 'user', pathMatch: 'prefix'}
    ]
  }
] as Route[];

