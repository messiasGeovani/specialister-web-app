import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-icon',
  templateUrl: './google-icon.component.html',
})
export class GoogleIconComponent {
  @Input('size') widthAndHeight: number = 50;
  @Input('color') fill: string = '#0066ff';

  get size(): string {
    return `${this.widthAndHeight}px`;
  }
}
