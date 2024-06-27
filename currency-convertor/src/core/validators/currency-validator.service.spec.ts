import { TestBed } from '@angular/core/testing';

import { CurrencyValidatorService } from './currency-validator.service';

describe('CurrencyValidatorService', () => {
  let service: CurrencyValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
