import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUploadComponent } from './chat-upload.component';

describe('ChatUploadComponent', () => {
  let component: ChatUploadComponent;
  let fixture: ComponentFixture<ChatUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
