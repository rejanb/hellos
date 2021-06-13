import { TestBed } from '@angular/core/testing';

import { FontApiService } from './font-api.service';

describe('FontApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FontApiService = TestBed.get(FontApiService);
    expect(service).toBeTruthy();
  });
});
