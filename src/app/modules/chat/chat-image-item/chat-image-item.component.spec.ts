import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImageItemComponent } from './chat-image-item.component';

describe('ChatImageItemComponent', () => {
  let component: ChatImageItemComponent;
  let fixture: ComponentFixture<ChatImageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatImageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatImageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
