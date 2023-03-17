import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserValidator } from 'src/app/modules/user/validators/user.validator';
import { ToastService } from 'src/app/shared/toast/services';
import { Auth } from '../../models/auth';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationValidator } from '../../validators/authentication.validator';

@Component({
  template: '',
})
export abstract class AbstractFormAuthenticationComponent implements OnInit {
  private authenticationService: AuthenticationService;
  private userService: UserService;
  private toastService: ToastService;

  form: FormGroup;
  isSubmitted = false;

  constructor() {
    const injector = GlobalInjector.injector;

    this.authenticationService = injector.get(AuthenticationService);
    this.userService = injector.get(UserService);
    this.toastService = injector.get(ToastService);
  }

  abstract isSignUpPage(): boolean;

  ngOnInit(): void {
    this.mountForm();
  }

  mountForm() {
    const fb = GlobalInjector.injector.get(FormBuilder);

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
            asyncValidators: [this.validateUsername()],
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
              this.validatePasswords('confirmPassword', true),
            ],
            updateOn: 'blur',
          },
        ],
        confirmPassword: [
          '',
          {
            validators: [this.validatePasswords('password')],
            updateOn: 'blur',
          },
        ],
      },
      { updateOn: 'submit' }
    );
  }

  validateUsername() {
    const abortValidation = !this.isSignUpPage();
    return UserValidator.validateUsername(this.userService, abortValidation);
  }

  validatePasswords(matchTo: string, reverse?: boolean) {
    const abortValidation = !this.isSignUpPage();
    return AuthenticationValidator.validatePasswords(
      matchTo,
      abortValidation,
      reverse
    );
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

    this.authenticationService.Autenticate(auth as Auth).subscribe({
      next: () => {
        this.toastService.showSuccess('Successfully authenticated user!');
      },
      error: (error) => {
        console.error('[AbstractFormAuthentication]: ', error);
        this.toastService.showError('Failed to sign in!');
      },
    });
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
