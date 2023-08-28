import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { ChatMessagesComponent } from "@modules/chat/components/messages/chat-messages.component";
import { ChatResolver } from "@modules/chat/resolver/chat.resolver";
import { ChatService } from "@modules/chat/services/chat.service";
import { ChatState } from "@modules/chat/store/chat.state";

import { NgxsModule } from "@ngxs/store";
import { NgScrollbarModule } from "ngx-scrollbar";

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatEmojiPickerComponent } from './components/emoji-picker/chat-emoji-picker.component';
import { FinderDialogComponent } from './components/finder-dialog/finder-dialog.component';
import { ChatImageItemComponent } from './components/image-item/chat-image-item.component';
import { ChatInputComponent } from './components/input/chat-input.component';
import { ChatUploadDialogComponent } from './components/upload-dialog/chat-upload-dialog.component';

@NgModule({
    imports: [
    CommonModule,
    ChatRoutingModule,
    NgScrollbarModule,
    NgxsModule.forFeature([ChatState]),
    FormsModule,
    ChatComponent,
    ChatInputComponent,
    ChatEmojiPickerComponent,
    ChatImageItemComponent,
    ChatMessagesComponent,
    ChatUploadDialogComponent,
    FinderDialogComponent,
],
    providers: [
        ChatService,
        ChatResolver
    ]
})
export class ChatModule {
}
