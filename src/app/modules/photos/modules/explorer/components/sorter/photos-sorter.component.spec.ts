import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosSorterComponent } from './photos-sorter.component';

describe('SorterComponent', () => {
  let component: PhotosSorterComponent;
  let fixture: ComponentFixture<PhotosSorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PhotosSorterComponent]
})
      .compileComponents();

    fixture = TestBed.createComponent(PhotosSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
