import { Component } from '@angular/core';
import { ResponsiveService } from 'src/app/core/services';
@Component({
  selector: 'app-form-role-definition',
  templateUrl: './form-role-definition.component.html',
  styleUrls: ['./form-role-definition.component.scss'],
})
export class FormRoleDefinitionComponent {
  selectedRole: string;

  constructor(public responsiveService: ResponsiveService) {}

  get roleDescription(): string {
    switch (this.selectedRole) {
      case 'specialist':
        return 'Help people solve specific problems in different projects.';

      case 'explorer':
        return 'Seek help and hire services from specialized professionals.';

      default:
        return 'Select how you want to be seen on the platform';
    }
  }
}
