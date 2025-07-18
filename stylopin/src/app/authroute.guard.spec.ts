import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authrouteGuard } from './authroute.guard';

describe('authrouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authrouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
