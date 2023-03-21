import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { HttpStatus } from 'src/app/core/models';
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

  isLoading = false;

  subscription: Subscription;

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
    this.subscription.unsubscribe();
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

    username.setErrors({ incorrect: null });
    password.setErrors({ incorrect: null });

    username.updateValueAndValidity();
    password.updateValueAndValidity();

    if (username.invalid && password.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    if (isSignUpPage && confirmPassword.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    this.isLoading = true;

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
      complete: () => {
        this.isLoading = false;
      },
    };

    this.subscription = this.userService
      .signUp(registrationData)
      .subscribe(userServiceSubscribeOptions);

    this.subscription.add(() => {
      this.isLoading = false;
    });
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
      error: (error: HttpStatus) => {
        error.errors.map((err) =>
          console.error('[AbstractFormAuthentication]:', err)
        );

        if (error.status === 400) {
          this.isSubmitted = false;

          this.username.setErrors({ incorrect: true });
          this.password.setErrors({ incorrect: true });

          error.errors.map((err) => this.toastService.showError(err));

          return;
        }

        this.toastService.showError('Failed to sign in!');
      },
    };

    this.subscription = this.authenticationService
      .Autenticate(auth)
      .subscribe(authenticationServiceSubscribeOptions);

    this.subscription.add(() => {
      this.isLoading = false;
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
