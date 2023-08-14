import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ChatRoutingModule } from "@modules/admin/modules/chat/chat-routing.module";
import { AdminChatOverviewComponent } from './components/admin-chat-overview.component';


@NgModule({
  declarations: [
    AdminChatOverviewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ChatRoutingModule,
  ]
})
export class ChatModule {}
