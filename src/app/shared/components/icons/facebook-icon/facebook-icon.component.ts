import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-facebook-icon',
  templateUrl: './facebook-icon.component.html',
  styleUrls: ['./facebook-icon.component.scss']
})
export class FacebookIconComponent {
  @Input('size') widthAndHeight: number = 24;
  @Input('color') fill: string = '#0066ff';

  get size(): string {
    return `${this.widthAndHeight}px`;
  }
}
