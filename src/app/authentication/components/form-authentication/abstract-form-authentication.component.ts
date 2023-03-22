import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserValidator } from 'src/app/modules/user/validators/user.validator';
import { ToastService } from 'src/app/shared/toast/services';
import { AuthenticationValidator } from '../../validators/authentication.validator';

@Component({
  template: '',
})
export abstract class AbstractFormAuthenticationComponent
  implements OnInit, OnDestroy
{
  private userService: UserService;
  private toastService: ToastService;

  @Input() isLoading = false;
  @Input() isSubmitted = false;
  @Input() isSignUpPage: boolean;

  @Output('submitForm') submit = new EventEmitter();

  form: FormGroup;

  subscription: Subscription;

  constructor() {
    const injector = GlobalInjector.injector;

    this.userService = injector.get(UserService);
    this.toastService = injector.get(ToastService);
  }

  ngOnInit(): void {
    this.mountForm();
  }

  ngOnDestroy(): void {
    if (!this.subscription) {
      return;
    }

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
            updateOn: 'change',
          },
        ],
        confirmPassword: [
          '',
          {
            validators: [this.validatePasswords('password')],
            updateOn: 'change',
          },
        ],
      },
      { updateOn: 'submit' }
    );
  }

  validateUsername() {
    const abortValidation = !this.isSignUpPage;
    return UserValidator.validateUsername(this.userService, abortValidation);
  }

  validatePasswords(matchTo: string, reverse?: boolean) {
    const abortValidation = !this.isSignUpPage;
    return AuthenticationValidator.validatePasswords(
      matchTo,
      abortValidation,
      reverse
    );
  }

  validateForm(event: SubmitEvent) {
    const { username, password, confirmPassword } = this;
    const isSignUpPage = this.isSignUpPage;

    this.isSubmitted = true;

    event.preventDefault();

    if (username.hasError('incorrect') || password.hasError('incorrect')) {
      username.setErrors({ incorrect: null });
      password.setErrors({ incorrect: null });

      username.updateValueAndValidity();
      password.updateValueAndValidity();
    }

    if (username.invalid && password.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    if (isSignUpPage && confirmPassword.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    const submitData = {
      username: isSignUpPage ? username.value : username,
      password: isSignUpPage ? password.value : password,
    };

    this.submit.emit(submitData);
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
