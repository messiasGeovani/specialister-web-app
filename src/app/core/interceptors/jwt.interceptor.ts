import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.sessionService.getCurrentUser();
    const authorization  = request.headers.get('authorization');

    if (!authorization && currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          authorization: `earer ${currentUser.token}`,
          token: String(currentUser.token)
        }
      })
    }
    
    return next.handle(request);
  }
}
