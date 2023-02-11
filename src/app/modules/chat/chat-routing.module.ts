import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from "@modules/chat/chat.component";
import { ChatResolver } from "@modules/chat/resolver/chat.resolver";

const routes: Routes = [{
  path: '', title: 'Chat', component: ChatComponent, resolve: {data: ChatResolver}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
