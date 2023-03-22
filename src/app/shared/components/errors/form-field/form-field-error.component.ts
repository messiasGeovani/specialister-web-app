import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
})
export class FormFieldErrorComponent {
  @Input() visible: boolean;
  @Input() message?: string;
}
