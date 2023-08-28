import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { NgxsModule } from "@ngxs/store";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from "./layout/admin-layout.component";

@NgModule({
    imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsModule.forFeature([UserState, PhotoState, ProtocolState]),
    AdminLayoutComponent,
]
})
export class AdminModule {}
