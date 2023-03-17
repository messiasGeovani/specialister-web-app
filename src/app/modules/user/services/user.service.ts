import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpService {
  constructor() {
    super();
  }

  checkIfUsernameExists(username: string) {
    return this.get<void>(`usernames/${username}`);
  }

  getApiUrl(): string {
    return environment.usersApiUrl;
  }
}
