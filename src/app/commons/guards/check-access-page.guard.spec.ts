import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkAccessPageGuard } from './check-access-page.guard';

describe('checkAccessPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkAccessPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
