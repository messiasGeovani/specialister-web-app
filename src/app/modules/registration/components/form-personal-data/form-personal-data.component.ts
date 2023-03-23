import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ResponsiveService } from 'src/app/core/services';
import { AbstractFormPersonalDataComponent } from './abstract-form-personal-data.component';

@Component({
  selector: 'app-form-personal-data',
  templateUrl: './form-personal-data.component.html',
  styleUrls: ['./form-personal-data.component.scss'],
})
export class FormPersonalDataComponent
  extends AbstractFormPersonalDataComponent
  implements OnInit
{
  constructor(public responsiveService: ResponsiveService) {
    super();
  }

  private nameValidation(name: AbstractControl) {
    const canValidate = this.isSubmitted || name.touched;

    if (!canValidate || !name.invalid) {
      return {
        hasError: false,
      };
    }

    if (name.hasError('required')) {
      return {
        hasError: true,
        message: 'This field cannot be empty!',
      };
    }

    return {
      hasError: true,
      message: 'Invalid name!',
    };
  }

  get firstNameValidation() {
    const { firstName } = this;

    return this.nameValidation(firstName);
  }

  get lastNameValidation() {
    const { lastName } = this;

    return this.nameValidation(lastName);
  }
}
