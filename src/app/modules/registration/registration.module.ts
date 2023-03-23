import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormCategoriesComponent } from './components/form-categories/form-categories.component';
import { FormPersonalDataComponent } from './components/form-personal-data/form-personal-data.component';
import { FormProfessionalDataComponent } from './components/form-professional-data/form-professional-data.component';
import { FormRoleDefinitionComponent } from './components/form-role-definition/form-role-definition.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    FormRoleDefinitionComponent,
    FormPersonalDataComponent,
    FormProfessionalDataComponent,
    FormCategoriesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    SharedModule,
  ],
})
export class RegistrationModule {}
