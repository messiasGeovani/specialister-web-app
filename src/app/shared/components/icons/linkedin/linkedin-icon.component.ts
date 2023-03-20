import { Component } from '@angular/core';
import { BaseIconComponent } from '../base/base-icon.component';

@Component({
  selector: 'app-linkedin-icon',
  templateUrl: './linkedin-icon.component.html',
  styleUrls: ['./linkedin-icon.component.scss'],
})
export class LinkedinIconComponent extends BaseIconComponent {
  constructor() {
    super();

    this.widthAndHeight = 30;
  }
}
