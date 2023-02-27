import { Injectable } from '@angular/core';
import { User } from 'src/app/authentication/models/user';
import { LocalStorageService } from '../';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private keyCurrentUser = 'v_U';
  private keys = [this.keyCurrentUser];

  private currentUser?: User | null;

  constructor(private localStorageService: LocalStorageService) {}

  getCurrentUser(): User {
    if (this.currentUser) {
      return this.currentUser;
    }

    return this.localStorageService.getValue(this.keyCurrentUser);
  }

  setCurrentUSer(currentUser: User) {
    this.localStorageService.save(this.keyCurrentUser, currentUser);
    this.currentUser = currentUser;
  }

  clearSession() {
    this.keys.forEach(key => {
      this.localStorageService.clear(key);
    })

    this.currentUser = null;
  }

  isLogged() : boolean {
    const user = this.getCurrentUser();

    if (!user) {
      return false;
    }

    return !!user.token;
  }
}
