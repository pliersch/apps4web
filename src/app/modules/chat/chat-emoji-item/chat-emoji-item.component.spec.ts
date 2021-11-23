import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEmojiItemComponent } from './chat-emoji-item.component';

describe('ChatEmojiItemComponent', () => {
  let component: ChatEmojiItemComponent;
  let fixture: ComponentFixture<ChatEmojiItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatEmojiItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatEmojiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
