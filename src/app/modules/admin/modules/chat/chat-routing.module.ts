import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChatOverviewComponent } from "@modules/admin/modules/chat/components/admin-chat-overview.component";

const routes: Routes = [
  {
    path: '', component: AdminChatOverviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
