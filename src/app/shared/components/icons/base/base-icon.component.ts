import { Component, Input } from '@angular/core';

@Component({
  template: '',
})
export abstract class BaseIconComponent {
  @Input('size') widthAndHeight: number;
  @Input() color: string;

  get size(): string {
    return `${this.widthAndHeight}px`;
  }
}
