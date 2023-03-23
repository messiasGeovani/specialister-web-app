import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService, SessionService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { Profile } from '../models';
import { TCreateProfile } from '../types/create-profile.type';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends HttpService {
  constructor(private sessionService: SessionService) {
    super();
  }

  createProfile(profile: TCreateProfile) {
    return this.post<TCreateProfile, void>(profile).pipe(
      map(() => this.saveCurrentProfile(profile))
    );
  }

  saveCurrentProfile(data: Profile | TCreateProfile) {
    const currentProfile = Object.assign(new Profile(), data);

    this.sessionService.setCurrentProfile(currentProfile);

    return currentProfile;
  }

  getApiUrl(): string {
    return environment.profilesApiUrl;
  }
}
