import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { SessionService } from 'src/app/core/services';
import { PageName } from 'src/app/shared/enums/page-name.enum';
import { PageMaps } from 'src/app/shared/maps/page.map';
import { environment } from 'src/environments/environment';
import { Authentication } from '../models/authentication';
import { AuthenticationResponse } from '../models/authentication-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private sessionService: SessionService,
    private http: HttpClient,
    private router: Router
  ) {}

  Autenticate(auth: Authentication) {
    const request = this.http.post(environment.usersApiUrl, auth);

    return request.pipe(
      map((response: any) => response.data),
      map((data: AuthenticationResponse) => {
        const currentUser = Object.assign(new User(), auth, data);

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
