import { TestBed } from '@angular/core/testing';

import { GetCreditService } from './get-credit.service';

describe('GetCreditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCreditService = TestBed.get(GetCreditService);
    expect(service).toBeTruthy();
  });
});
