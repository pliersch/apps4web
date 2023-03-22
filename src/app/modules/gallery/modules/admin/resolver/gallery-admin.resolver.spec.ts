import { TestBed } from '@angular/core/testing';

import { GalleryAdminResolver } from './gallery-admin.resolver';

describe('GalleryAdminResolver', () => {
  let resolver: GalleryAdminResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GalleryAdminResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
