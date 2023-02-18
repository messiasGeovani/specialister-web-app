import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { FormAuthenticationComponent } from './components/form-authentication/form-authentication.component';

@NgModule({
  declarations: [AuthenticationComponent, FormAuthenticationComponent],
  imports: [CommonModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
