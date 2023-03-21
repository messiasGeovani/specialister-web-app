import { Component } from '@angular/core';
import { BaseAnimatedIconComponent } from '../../base/base-animated-icon.component';

@Component({
  selector: 'app-spinner-icon',
  templateUrl: './spinner-icon.component.html',
  styleUrls: ['./spinner-icon.component.scss'],
})
export class SpinnerIconComponent extends BaseAnimatedIconComponent {
  constructor() {
    super();

    if (!this.widthAndHeight) {
      this.widthAndHeight = 200;
    }
  }
}
