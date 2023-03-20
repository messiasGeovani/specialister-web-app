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
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { StepperComponent } from './stepper/stepper.component';
import { StepperService } from './stepper/services/stepper.service';

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
    BreadcrumbsComponent,
    StepperComponent,
  ],
  imports: [CommonModule, NgbToastModule],
  providers: [ToastService, StepperService],
  exports: [
    NavComponent,
    FooterComponent,
    BodyComponent,
    GoogleIconComponent,
    LinkedinIconComponent,
    FacebookIconComponent,
    FormFieldErrorComponent,
    BreadcrumbsComponent,
    StepperComponent,
  ],
})
export class SharedModule {}
