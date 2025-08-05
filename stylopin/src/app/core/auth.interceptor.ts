// src/app/core/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * A helper function that safely retrieves the token from localStorage.
 * This prevents SSR crashes by checking for the browser environment.
 */
function getTokenSafe(): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('token') || '';
  }
  return '';
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  
  const token = getTokenSafe();

  // Log to verify interceptor is working
  console.log('Auth Interceptor running - token found:', !!token);

  // Clone the request and set the Authorization header if token is present
  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP error in interceptor:', error);
      return throwError(() => error);
    })
  );
};
