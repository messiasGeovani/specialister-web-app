import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/core/services';
import { PageName } from 'src/app/shared/enums/page-name.enum';
import { PageMaps } from 'src/app/shared/maps/page.map';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanMatch {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogged = this.authenticationService.isLogged();

    if (!isLogged) {
      this.authenticationService.logout();
      return false;
    }

    return true;
  }

  canMatch():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isUserLogged = this.canActivate();

    if (!isUserLogged) {
      return false;
    }

    const currentUser = this.sessionService.getCurrentUser();
    const currentProfile = this.sessionService.getCurrentProfile();

    if (!currentUser.role || !currentProfile || currentProfile.completed) {
      this.router.navigate([PageMaps.get(PageName.Registration)]);
      return false;
    }

    return true;
  }
}
