import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TIconName } from 'src/app/shared/types/icon-name.type';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.scss'],
})
export class SelectButtonComponent {
  @Input() isSelected?: boolean;
  @Input() iconName?: TIconName;
  @Input() multiple?: boolean;

  @Output() selected = new EventEmitter();

  isActive: boolean;

  handleSelect() {
    if (this.multiple) {
      this.isSelected = !this.isSelected;
    }

    this.selected.emit();
  }

  get showEyeIcon(): boolean {
    return this.iconName === 'eye';
  }

  get showWorkIcon(): boolean {
    return this.iconName === 'work';
  }

  get color(): string {
    return this.isActive || this.isSelected ? 'white' : '#367CFF';
  }
}
