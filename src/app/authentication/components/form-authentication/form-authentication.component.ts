import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-authentication',
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
})
export class FormAuthenticationComponent implements OnInit {
  @Input() page: string;
  @Output() submit = new EventEmitter();

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      this.matchValidator('confirmPassword', true),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      this.matchValidator('password'),
    ]),
  });

  iconColors = {
    google: '',
    facebook: '',
    linkedin: '',
  };

  constructor() {
    this.iconColors.google = this.googleColor;
    this.iconColors.facebook = this.facebookColor;
    this.iconColors.linkedin = this.linkedinColor;
  }

  ngOnInit(): void {
    this.submit.emit(this.authForm.value);
  }

  isSignUpPage(): boolean {
    return this.page === 'sign-up';
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
    const email = this.authForm.get('email');
    const password = this.authForm.get('password');
    const confirmPassword = this.authForm.get('confirmPassword');

    const isSignUpPage = this.isSignUpPage();

    event.preventDefault();

    if (
      isSignUpPage &&
      email?.errors &&
      password?.errors &&
      confirmPassword?.errors
    ) {
      return;
    }

    if (!isSignUpPage && email?.errors && password?.errors) {
      return;
    }

    return isSignUpPage ? this.signUp() : this.signIn();
  }

  signUp() {}

  signIn() {}

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
