import { Component } from '@angular/core';
import { BaseIconComponent } from '../base/base-icon.component';

@Component({
  selector: 'app-work-icon',
  templateUrl: './work-icon.component.html',
  styleUrls: ['./work-icon.component.scss'],
})
export class WorkIconComponent extends BaseIconComponent {
  constructor() {
    super();

    if (!this.widthAndHeight) {
      this.widthAndHeight = 24;
    }
  }
}
