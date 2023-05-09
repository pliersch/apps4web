import { TestBed } from '@angular/core/testing';

import { PhotosAdminResolver } from './photos-admin-resolver.service';

describe('PhotosAdminResolver', () => {
  let resolver: PhotosAdminResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PhotosAdminResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
