import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVerticalScrollerComponent } from './gallery-vertical-scroller.component';

describe('GalleryVerticalScrollerComponent', () => {
  let component: GalleryVerticalScrollerComponent;
  let fixture: ComponentFixture<GalleryVerticalScrollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryVerticalScrollerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryVerticalScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
