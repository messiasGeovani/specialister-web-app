import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(message: string | TemplateRef<any>) {
    this.show(message, { classname: 'bg-success text-light', delay: 10000 });
  }

  showError(dangerTpl: string | TemplateRef<any>) {
    this.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
