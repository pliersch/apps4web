import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryStarRatingComponent } from './gallery-star-rating.component';

describe('GalleryStarRatingComponent', () => {
  let component: GalleryStarRatingComponent;
  let fixture: ComponentFixture<GalleryStarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryStarRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
