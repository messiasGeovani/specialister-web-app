import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/core/services';
import { UserService } from 'src/app/modules/user/services/user.service';
import { StepperService } from 'src/app/shared/stepper/services/stepper.service';
import { ToastService } from 'src/app/shared/toast/services';
@Component({
  selector: 'app-form-role-definition',
  templateUrl: './form-role-definition.component.html',
  styleUrls: ['./form-role-definition.component.scss'],
})
export class FormRoleDefinitionComponent implements OnDestroy {
  @ViewChild('formContainer') container: ElementRef<HTMLDivElement>;

  selectedRole: string;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private stepeprService: StepperService,
    private toastService: ToastService,
    public responsiveService: ResponsiveService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setUserRole() {
    const userServiceSubscribeOptions = {
      next: () => {
        this.container.nativeElement.classList.add(
          'animate__fadeOutLeft',
          'animate__faster'
        );

        setTimeout(() => {
          this.stepeprService.nextStep();
        }, 500);
      },

      error: (error?: any) => {
        console.error('[FormRoleDefinition]: ', error);
        this.toastService.showError('Failed to set user role.');
      },
    };

    this.subscription = this.userService
      .updateUserRole(this.selectedRole)
      .subscribe(userServiceSubscribeOptions);
  }

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
