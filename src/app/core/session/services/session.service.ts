import { Injectable } from '@angular/core';
import { AuthenticatedUser } from 'src/app/authentication/models/authenticated-user';
import { Profile } from 'src/app/modules/profile/models';
import { LocalStorageService } from '../../global/services';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private keyCurrentUser = 'v_U';
  private keyCurrentProfile = 'v_P';
  private keys = [this.keyCurrentUser, this.keyCurrentProfile];

  private currentUser?: AuthenticatedUser | null;
  private currentProfile?: Profile | null;

  constructor(private localStorageService: LocalStorageService) {}

  getCurrentUser(): AuthenticatedUser {
    if (this.currentUser) {
      return this.currentUser;
    }

    return this.localStorageService.getValue(this.keyCurrentUser);
  }

  setCurrentUser(currentUser: AuthenticatedUser) {
    this.localStorageService.save(this.keyCurrentUser, currentUser);
    this.currentUser = currentUser;
  }

  getCurrentProfile(): Profile {
    if (this.currentProfile) {
      return this.currentProfile;
    }

    return this.localStorageService.getValue(this.keyCurrentProfile);
  }

  setCurrentProfile(currentProfile: Profile) {
    this.localStorageService.save(this.keyCurrentProfile, currentProfile);
    this.currentProfile = currentProfile;
  }

  clearSession() {
    this.keys.forEach((key) => {
      this.localStorageService.clear(key);
    });

    this.currentUser = null;
  }

  isLogged(): boolean {
    const user = this.getCurrentUser();

    if (!user) {
      return false;
    }

    return !!user.token;
  }
}
