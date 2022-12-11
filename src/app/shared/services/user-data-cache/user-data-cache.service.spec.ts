import { TestBed } from '@angular/core/testing';

import { UserDataCacheService } from './user-data-cache.service';

describe('UserDataCacheService', () => {
  let service: UserDataCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
