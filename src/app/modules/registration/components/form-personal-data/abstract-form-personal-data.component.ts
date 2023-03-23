import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ToastService } from 'src/app/shared/toast/services';

@Component({
  template: '',
})
export abstract class AbstractFormPersonalDataComponent
  implements OnInit, OnDestroy
{
  private toastService = GlobalInjector.injector.get(ToastService);

  isLoading = false;
  isSubmitted = false;

  form: FormGroup;

  subscription: Subscription;

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
        firstName: [
          '',
          {
            validators: [Validators.required, Validators.maxLength(25)],
            updateOn: 'change',
          },
        ],
        lastName: [
          '',
          {
            validators: [Validators.required, Validators.maxLength(25)],
            updateOn: 'change',
          },
        ],
      },
      { updateOn: 'submit' }
    );
  }

  validateForm(event: SubmitEvent) {
    const { firstName, lastName } = this;

    this.isSubmitted = true;

    event.preventDefault();

    if (firstName.invalid && lastName.invalid) {
      this.toastService.showError('Please fill in the form correctly');
      return;
    }

    this.isLoading = true;
  }

  get firstName() {
    return this.form.controls['firstName'];
  }

  get lastName() {
    return this.form.controls['lastName'];
  }
}
