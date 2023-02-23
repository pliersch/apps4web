import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { ChatMessagesComponent } from "@modules/chat/components/messages/chat-messages.component";
import { ChatResolver } from "@modules/chat/resolver/chat.resolver";
import { ChatService } from "@modules/chat/store/chat.service";
import { ChatState } from "@modules/chat/store/chat.state";
import { FileDragDropModule } from "@modules/file-drag-drop/file-drag-drop.module";
import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatEmojiItemComponent } from './components/emoji-item/chat-emoji-item.component';
import { ChatEmojiPickerComponent } from './components/emoji-picker/chat-emoji-picker.component';
import { ChatImageItemComponent } from './components/image-item/chat-image-item.component';
import { ChatInputComponent } from './components/input/chat-input.component';
import { ChatToolbarComponent } from './components/toolbar/chat-toolbar.component';
import { ChatUploadDialogComponent } from './components/upload-dialog/chat-upload-dialog.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatInputComponent,
    ChatToolbarComponent,
    ChatEmojiPickerComponent,
    ChatEmojiItemComponent,
    ChatImageItemComponent,
    ChatMessagesComponent,
    ChatUploadDialogComponent
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
    ChatService,
    ChatResolver
  ]

})
export class ChatModule {
}
