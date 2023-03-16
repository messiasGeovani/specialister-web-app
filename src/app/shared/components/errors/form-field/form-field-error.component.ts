import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
})
export class FormFieldErrorComponent {
  @Input() isFormSubmited?: boolean;
  @Input() control?: AbstractControl;
  @Input() controls?: AbstractControl[];
  @Input() message: string;

  private hasAnyErrorInControList(): boolean {
    if (!this.controls) {
      return false;
    }

    return this.controls.some((control) => {
      const canExecuteValidation = this.isFormSubmited || control.touched;
      return canExecuteValidation && control.invalid;
    });
  }

  hasErrors(): boolean {
    if (this.controls?.length) {
      return this.hasAnyErrorInControList();
    }

    const canExecuteValidation = this.isFormSubmited || this.control?.touched;
    const hasControlError = canExecuteValidation && this.control?.invalid;

    return hasControlError || false;
  }
}
