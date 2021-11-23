import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmojiPickerComponent } from './chat-emoji-picker.component';

describe('ChatEmojiPickerComponent', () => {
  let component: ChatEmojiPickerComponent;
  let fixture: ComponentFixture<ChatEmojiPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatEmojiPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEmojiPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
