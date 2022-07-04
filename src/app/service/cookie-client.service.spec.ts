import { TestBed } from '@angular/core/testing';

import { CookieClientService } from './cookie-client.service';

describe('CookieClientService', () => {
  let service: CookieClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
