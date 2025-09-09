import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Ignora a requisição de refresh para não causar loop
  if (req.url.includes('/refresh-token')) {
    return next.handle(req);
  }

  return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Tenta dar refresh
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            // Clona a requisição original com o token atualizado
            const clonedReq = req.clone();
            return next.handle(clonedReq);
          }),
          catchError(() => {
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
}

}

