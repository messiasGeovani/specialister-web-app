import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from 'src/app/core/http/services/http.service';
import { SessionService } from 'src/app/core/session/services/session.service';
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
    return this.post<TCreateProfile, Profile>(profile).pipe(
      map((data) => this.saveCurrentProfile(data))
    );
  }

  saveCurrentProfile(data: Profile) {
    const currentProfile = Object.assign(new Profile(), data);

    this.sessionService.setCurrentProfile(currentProfile);

    return currentProfile;
  }

  getApiUrl(): string {
    return environment.profilesApiUrl;
  }
}
