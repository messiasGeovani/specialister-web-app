import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent, BodyComponent, FooterComponent } from './layout';
import {
  GoogleIconComponent,
  LinkedinIconComponent,
  FacebookIconComponent,
} from './components/icons';
import { ToastService } from './toast/services';
import { FormFieldErrorComponent } from './components/errors';
import { ToastComponent } from './toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    GoogleIconComponent,
    LinkedinIconComponent,
    FacebookIconComponent,
    FormFieldErrorComponent,
    ToastComponent,
    BodyComponent,
  ],
  imports: [CommonModule, NgbToastModule],
  providers: [ToastService],
  exports: [
    NavComponent,
    FooterComponent,
    BodyComponent,
    GoogleIconComponent,
    LinkedinIconComponent,
    FacebookIconComponent,
    FormFieldErrorComponent,
  ],
})
export class SharedModule {}
