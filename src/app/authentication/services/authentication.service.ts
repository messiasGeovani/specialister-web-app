import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { SessionService } from 'src/app/core/services';
import { PageName } from 'src/app/shared/enums/page-name.enum';
import { PageMaps } from 'src/app/shared/maps/page.map';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../models/authenticated-user';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private sessionService: SessionService,
    private http: HttpClient,
    private router: Router
  ) {}

  Autenticate(auth: Auth) {
    const requestPath = environment.authApiUrl + '/auth';
    const request = this.http.post(requestPath, auth);

    return request.pipe(
      map((response: any) => response.data),
      map((data: AuthenticatedUser) => {
        const currentUser = Object.assign(new Auth(), auth, data);

        this.sessionService.setCurrentUSer(currentUser);

        return currentUser;
      })
    );
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate([PageMaps.get(PageName.Authentication)]);
  }

  isLogged() {
    return this.sessionService.isLogged();
  }
}
