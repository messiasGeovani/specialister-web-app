import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../modules/user/services/user.service';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { FormAuthenticationComponent } from './components/form-authentication/form-authentication.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [AuthenticationComponent, FormAuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [AuthenticationService, UserService],
})
export class AuthenticationModule {}
