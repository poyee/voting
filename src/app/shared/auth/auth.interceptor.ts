import { HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../service/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const loginPath = '/login';
    const token = this.token.getToken();
    if (token !== undefined) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    return next.handle(authReq)
      .pipe(tap(() => {
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401 || window.location.pathname === loginPath) {
              return;
            }
            this.token.signOut();
            window.location.href = `${loginPath}?redirectUrl=${window.location.href}`;
          }
        }
      ));
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
