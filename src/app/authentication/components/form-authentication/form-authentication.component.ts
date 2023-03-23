import { Component, OnInit } from '@angular/core';
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

  get usernameValidation(): any {
    const { username } = this;
    const canValidate = this.isSubmitted || username.touched;

    if (!canValidate || !username.invalid) {
      return {
        hasError: false,
      };
    }

    if (username.hasError('required')) {
      return {
        hasError: true,
        message: 'Username cannot be empty!',
      };
    }

    if (username.hasError('incorrect')) {
      return {
        hasError: true,
        message: 'Username or password is incorrect!',
      };
    }

    if (!this.isSignUpPage) {
      return {
        hasError: false,
      };
    }

    if (username.hasError('usernameAlreadyExists')) {
      return {
        hasError: true,
        message: 'Username already exists!',
      };
    }

    if (username.hasError('verificationFailed')) {
      return {
        hasError: true,
        message: 'Failed to verify username!',
      };
    }

    if (username.hasError('minlength') || username.hasError('maxlength')) {
      return {
        hasError: true,
        message: 'Username must have between 2 and 25 characters!',
      };
    }

    return {
      hasError: true,
      message: 'Invalid username.',
    };
  }

  get passwordValidation(): any {
    const { password, confirmPassword } = this;

    const canValidate = this.isSubmitted || password.touched;
    const wasInputsTouched = password.touched && confirmPassword.touched;

    const passwordMatchingError =
      password.hasError('matching') || confirmPassword.hasError('matching');

    if (this.isSignUpPage && wasInputsTouched && passwordMatchingError) {
      return {
        hasError: true,
        message: "Passwords doesn't match!",
      };
    }

    if (!canValidate || !password.invalid) {
      return {
        hasErrors: false,
      };
    }

    if (password.hasError('required')) {
      return {
        hasError: true,
        message: 'Password cannot be empty!',
      };
    }

    if (password.hasError('incorrect')) {
      return {
        hasError: true,
        message: 'Username or password is incorrect!',
      };
    }

    if (password.hasError('minlength')) {
      return {
        hasError: true,
        message: 'Password must have at least 8 characters!',
      };
    }

    return {
      hasError: true,
      message: 'Invalid password.',
    };
  }

  get confirmPasswordValidation() {
    const { password, confirmPassword } = this;
    const wasInputsTouched = password.touched && confirmPassword.touched;
    const canValidate = this.isSubmitted || wasInputsTouched;

    if (!this.isSignUpPage || !canValidate || !confirmPassword.invalid) {
      return {
        hasError: false,
      };
    }

    if (confirmPassword.hasError('matching')) {
      return {
        hasError: true,
        message: "Passwords doesn't match!",
      };
    }

    return {
      hasError: true,
      message: 'Invalid Password.',
    };
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
