import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpService, SessionService } from 'src/app/core/services';
import { User } from 'src/app/modules/user/models/user';
import { UserService } from 'src/app/modules/user/services/user.service';
import { PageName } from 'src/app/shared/enums/page-name.enum';
import { PageMaps } from 'src/app/shared/maps/page.map';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../models/authenticated-user';
import { TAuth } from '../types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends HttpService {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  Autenticate(auth: TAuth) {
    return this.post<TAuth, AuthenticatedUser>(auth).pipe(
      map((response) => response.data),
      map(this.userService.saveCurrentUser)
    );
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate([PageMaps.get(PageName.Authentication)]);
  }

  isLogged() {
    return this.sessionService.isLogged();
  }

  getApiUrl(): string {
    return environment.authApiUrl;
  }
}
