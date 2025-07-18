import { CanActivateFn } from '@angular/router';

export const authrouteGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = false; // Replace with real logic
    if (!isLoggedIn) {
      return false;
    }
    return true;
};
