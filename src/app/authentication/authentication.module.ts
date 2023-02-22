import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { FormAuthenticationComponent } from './components/form-authentication/form-authentication.component';

@NgModule({
  declarations: [AuthenticationComponent, FormAuthenticationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthenticationModule {}
