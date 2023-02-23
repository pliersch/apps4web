import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUploadDialogComponent } from './chat-upload-dialog.component';

describe('UploadDialogComponent', () => {
  let component: ChatUploadDialogComponent;
  let fixture: ComponentFixture<ChatUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatUploadDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
