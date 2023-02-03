import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySorterComponent } from './gallery-sorter.component';

describe('SorterComponent', () => {
  let component: GallerySorterComponent;
  let fixture: ComponentFixture<GallerySorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GallerySorterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GallerySorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
