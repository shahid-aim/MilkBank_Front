import { TestBed } from '@angular/core/testing';

import { DonorRegistrationService } from './donor-registration.service';

describe('DonorRegistrationService', () => {
  let service: DonorRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
