import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {ChatInputComponent} from './chat-input/chat-input.component';
import {ChatToolbarComponent} from './chat-toolbar/chat-toolbar.component';
import {ChatEmojiPickerComponent} from './chat-emoji-picker/chat-emoji-picker.component';
import {ChatEmojiItemComponent} from './chat-emoji-item/chat-emoji-item.component';
import {ChatImageItemComponent} from './chat-image-item/chat-image-item.component';
import {ChatUploadComponent} from './chat-upload/chat-upload.component';
import {ChatMessagesComponent} from "@modules/chat/chat-messages/chat-messages.component";
import {NgxScrollbarModule} from "@app/shared/ngx-scrollbar/ngx-scrollbar.module";
import {MaterialModule} from "@app/shared/material/material.module";
import {NgxsModule} from "@ngxs/store";
import {ChatState} from "@modules/chat/store/chat.state";
import {ChatService} from "@modules/chat/store/chat.service";
import {FormsModule} from "@angular/forms";


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
    NgxScrollbarModule,
    MaterialModule,
    NgxsModule.forFeature([ChatState]),
    FormsModule,
  ],
  providers: [
    ChatService
  ]

})
export class ChatModule {
}
