import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthenticatedUser } from 'src/app/authentication/models/authenticated-user';
import { TAuth } from 'src/app/authentication/types/auth.type';
import { HttpService, SessionService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  constructor(private sessionService: SessionService) {
    super();
  }

  checkIfUsernameExists(username: string) {
    return this.get<void>(`/usernames/${username}`);
  }

  signUp(user: TAuth) {
    return this.post<TAuth, AuthenticatedUser>(user).pipe(
      map((response) => response.data),
      map(this.saveCurrentUser)
    );
  }

  updateUserRole(role: string) {
    if (!role) {
      throw new Error(
        '[UserService::updateUserRole()]: role param cannot be empty.'
      );
    }

    if (role !== 'specialist' && role !== 'explorer') {
      throw new Error('[UserService::updateUserRole()]: invalid role.');
    }

    return this.patch<AuthenticatedUser>(`/roles/${role}`).pipe(
      map((response) => response.data),
      map(this.saveCurrentUser)
    );
  }

  saveCurrentUser(data: AuthenticatedUser) {
    const currentUser = Object.assign(new AuthenticatedUser(), data);

    this.sessionService.setCurrentUser(currentUser);

    return currentUser;
  }

  getApiUrl(): string {
    return environment.usersApiUrl;
  }
}
