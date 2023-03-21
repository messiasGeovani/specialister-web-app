import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractFormAuthenticationComponent } from './abstract-form-authentication.component';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
})
export class FormAuthenticationComponent
  extends AbstractFormAuthenticationComponent
  implements OnInit
{
  @Input() page: string;
  @Output() submit = new EventEmitter();

  iconColors = {
    google: '',
    facebook: '',
    linkedin: '',
  };

  constructor() {
    super();
    this.iconColors.google = this.googleColor;
    this.iconColors.facebook = this.facebookColor;
    this.iconColors.linkedin = this.linkedinColor;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.submit.emit(this.form?.value);
  }

  isSignUpPage(): boolean {
    return this.page === 'sign-up';
  }

  get usernameValidationMessage(): string {
    const { username } = this;

    if (username.hasError('required')) {
      return 'Username cannot be empty!';
    }

    if (username.hasError('incorrect')) {
      return 'Username or password is incorrect!';
    }

    if (username.hasError('usernameAlreadyExists')) {
      return 'Username already exists!';
    }

    if (username.hasError('verificationFailed')) {
      return 'Failed to verify username!';
    }

    return 'Username must have ate least 2 characters!';
  }

  get passwordValidationMessage(): string {
    const { password } = this;

    if (password.hasError('required')) {
      return 'Password cannot be empty!';
    }

    if (password.hasError('minlength')) {
      return 'Password must have at least 8 characters!';
    }

    if (password.hasError('incorrect')) {
      return 'Username or password is incorrect!';
    }

    return "Passwords doesn't match!";
  }

  get googleColor(): string {
    return 'red';
  }

  get facebookColor(): string {
    return '#4267B2';
  }

  get linkedinColor(): string {
    return '#0e76a8';
  }
}
