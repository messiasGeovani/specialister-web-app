import { Component } from '@angular/core';
import { BaseIconComponent } from '../../base/base-icon.component';

@Component({
  selector: 'app-google-icon',
  templateUrl: './google-icon.component.html',
})
export class GoogleIconComponent extends BaseIconComponent {
  constructor() {
    super();

    this.widthAndHeight = 50;
    this.color = '#0066ff';
  }
}
