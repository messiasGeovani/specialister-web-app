import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-linkedin-icon',
  templateUrl: './linkedin-icon.component.html',
  styleUrls: ['./linkedin-icon.component.scss'],
})
export class LinkedinIconComponent {
  @Input('size') widthAndHeight: number = 30;
  @Input('color') fill: string;

  get size(): string {
    return `${this.widthAndHeight}px`;
  }
}
