import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { HttpStatus } from '../../models/http-status';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private Injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const authenticationService = this.Injector.get(AuthenticationService);
        const httpStatus = new HttpStatus(
          err.status,
          err.statusText,
          err.error.message
        );

        if (httpStatus.status === 401) {
          authenticationService.logout();
        }

        return throwError(
          () => new Error(httpStatus.message, httpStatus as ErrorOptions)
        );
      })
    );
  }
}
