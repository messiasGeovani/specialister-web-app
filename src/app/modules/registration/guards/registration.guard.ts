import { Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { SessionService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class RegistrationGuard implements CanMatch {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService
  ) {}

  canMatch():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogged = this.authenticationService.isLogged();

    if (!isLogged) {
      this.authenticationService.logout();
      return false;
    }

    const currentUser = this.sessionService.getCurrentUser();
    const currentProfile = this.sessionService.getCurrentProfile();

    if (!currentUser.role || !currentProfile || !currentProfile.completed) {
      return true;
    }

    this.router.navigate[''];
    return false;
  }
}
