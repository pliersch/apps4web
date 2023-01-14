import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatToolbarComponent } from './chat-toolbar/chat-toolbar.component';
import { ChatEmojiPickerComponent } from './chat-emoji-picker/chat-emoji-picker.component';
import { ChatEmojiItemComponent } from './chat-emoji-item/chat-emoji-item.component';
import { ChatImageItemComponent } from './chat-image-item/chat-image-item.component';
import { ChatUploadComponent } from './chat-upload/chat-upload.component';
import { ChatMessagesComponent } from "@modules/chat/chat-messages/chat-messages.component";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { NgxsModule } from "@ngxs/store";
import { ChatState } from "@modules/chat/store/chat.state";
import { ChatService } from "@modules/chat/store/chat.service";
import { FormsModule } from "@angular/forms";
import { FileDragDropModule } from "@modules/file-drag-drop/file-drag-drop.module";
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
    ChatComponent,
    ChatInputComponent,
    ChatToolbarComponent,
    ChatEmojiPickerComponent,
    ChatEmojiItemComponent,
    ChatImageItemComponent,
    ChatMessagesComponent,
    ChatUploadComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NgScrollbarModule,
    MaterialModule,
    NgxsModule.forFeature([ChatState]),
    FormsModule,
    FileDragDropModule,
  ],
  providers: [
    ChatService
  ]

})
export class ChatModule {
}
