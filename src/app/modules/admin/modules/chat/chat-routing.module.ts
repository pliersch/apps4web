import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChatComponent } from "@modules/admin/modules/chat/admin-chat.component";

const routes: Routes = [
  {
    path: '', component: AdminChatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
