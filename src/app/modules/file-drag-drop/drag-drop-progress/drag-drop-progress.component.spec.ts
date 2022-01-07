import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropProgressComponent } from './drag-drop-progress.component';

describe('DragDropProgressComponent', () => {
  let component: DragDropProgressComponent;
  let fixture: ComponentFixture<DragDropProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
