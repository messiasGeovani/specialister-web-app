import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { ToastService } from 'src/app/shared/toast/services';
import { Authentication } from '../../models/authentication';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  template: '',
})
export abstract class AbstractFormAuthenticationComponent {
  private authenticationService: AuthenticationService;
  private toastService: ToastService;

  form: FormGroup;
  isSubmitted = false;

  constructor() {
    const injector = GlobalInjector.injector;

    this.authenticationService = injector.get(AuthenticationService);
    this.toastService = injector.get(ToastService);

    const fb = injector.get(FormBuilder);

    this.mountForm(fb);
  }

  abstract isSignUpPage(): boolean;

  mountForm(fb: FormBuilder) {
    this.form = fb.group(
      {
        username: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(25),
            ],
            updateOn: 'blur',
          },
        ],
        password: [
          '',
          {
            validators: [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(25),
              this.matchValidator('confirmPassword', true),
            ],
            updateOn: 'blur',
          },
        ],
        confirmPassword: [
          '',
          {
            validators: [this.matchValidator('password')],
            updateOn: 'blur',
          },
        ],
      },
      { updateOn: 'submit' }
    );
  }

  matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.isSignUpPage()) {
        return null;
      }

      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo];

        if (c) {
          c.updateValueAndValidity();
        }

        return null;
      }

      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }

  validateForm(event: SubmitEvent) {
    const { username, password, confirmPassword } = this;
    const isSignUpPage = this.isSignUpPage();

    this.isSubmitted = true;

    event.preventDefault();

    if (username.invalid && password.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    if (isSignUpPage && confirmPassword.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    return isSignUpPage ? this.signUp() : this.signIn();
  }

  signUp() {}

  signIn() {
    const { username, password } = this;

    const auth = {
      username: username.value,
      password: password.value,
    };

    this.authenticationService.Autenticate(auth as Authentication).subscribe(
      () => {
        alert('Success');
      },
      (error) => {
        console.error('[AbstractFormAuthentication]: ', error);
        this.toastService.showError('Failed to sign in!');
      }
    );
  }

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'];
  }
}
