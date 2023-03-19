import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserValidator } from 'src/app/modules/user/validators/user.validator';
import { ToastService } from 'src/app/shared/toast/services';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationValidator } from '../../validators/authentication.validator';

@Component({
  template: '',
})
export abstract class AbstractFormAuthenticationComponent
  implements OnInit, OnDestroy
{
  private authenticationService: AuthenticationService;
  private userService: UserService;
  private toastService: ToastService;

  form: FormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = [];

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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

  signUp() {
    const { username, password } = this;

    const registrationData = {
      username: username.value,
      password: password.value,
    };

    const userServiceSubscribeOptions = {
      next: () => {
        this.toastService.showSuccess('Successfully registered user!');
      },
      error: (error?: any) => {
        console.error('[AbstractFormAuthentication]: ', error);
        this.toastService.showError('Failed to sign up!');
      },
    };

    this.subscriptions.push(
      this.userService
        .signUp(registrationData)
        .subscribe(userServiceSubscribeOptions)
    );
  }

  signIn() {
    const { username, password } = this;

    const auth = {
      username: username.value,
      password: password.value,
    };

    const authenticationServiceSubscribeOptions = {
      next: () => {
        this.toastService.showSuccess('Successfully authenticated user!');
      },
      error: (error?: any) => {
        console.error('[AbstractFormAuthentication]: ', error);
        this.toastService.showError('Failed to sign in!');
      },
    };

    this.subscriptions.push(
      this.authenticationService
        .Autenticate(auth)
        .subscribe(authenticationServiceSubscribeOptions)
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
