import { Component } from '@angular/core';
import { BaseIconComponent } from '../base/base-icon.component';

@Component({
  selector: 'app-eye-icon',
  templateUrl: './eye-icon.component.html',
  styleUrls: ['./eye-icon.component.scss'],
})
export class EyeIconComponent extends BaseIconComponent {
  constructor() {
    super();

    this.widthAndHeight = 32;
  }
}
