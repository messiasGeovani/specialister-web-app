import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from './components/breadcrumbs';
import { SelectButtonComponent } from './components/buttons';
import { FormFieldErrorComponent } from './components/errors';
import {
  EyeIconComponent,
  FacebookIconComponent,
  GoogleIconComponent,
  LinkedinIconComponent,
} from './components/icons';
import { BodyComponent, FooterComponent, NavComponent } from './layout';
import { StepperService } from './stepper/services/stepper.service';
import { StepperComponent } from './stepper/stepper.component';
import { ToastService } from './toast/services';
import { ToastComponent } from './toast/toast.component';
import { WorkIconComponent } from './components/icons';

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
    SelectButtonComponent,
    EyeIconComponent,
    WorkIconComponent,
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
    SelectButtonComponent,
    EyeIconComponent,
    WorkIconComponent,
  ],
})
export class SharedModule {}
