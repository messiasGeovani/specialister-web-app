import { Component } from '@angular/core';
import { BaseIconComponent } from '../base/base-icon.component';

@Component({
  selector: 'app-facebook-icon',
  templateUrl: './facebook-icon.component.html',
  styleUrls: ['./facebook-icon.component.scss'],
})
export class FacebookIconComponent extends BaseIconComponent {
  constructor() {
    super();

    this.widthAndHeight = 24;
    this.fill = '#0066ff';
  }
}
