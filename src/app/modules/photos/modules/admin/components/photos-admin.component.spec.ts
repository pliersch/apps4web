import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosAdminComponent } from './photos-admin.component';

describe('GenerallyComponent', () => {
  let component: PhotosAdminComponent;
  let fixture: ComponentFixture<PhotosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
