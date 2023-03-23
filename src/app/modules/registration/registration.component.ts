import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/services';
import { Step } from 'src/app/shared/stepper/models/step';
import { StepperService } from 'src/app/shared/stepper/services/stepper.service';
import { RegistrationSteps } from './enums/registration-steps.enum';
import { RegistrationStepMaps } from './maps/registration-steps.map';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  steps: string[];

  constructor(
    private sessionService: SessionService,
    private stepperService: StepperService
  ) {}

  ngOnInit(): void {
    this.configPendingSteps();
    this.stepperService.mountSteps(this.steps);
  }

  configPendingSteps() {
    const currentUser = this.sessionService.getCurrentUser();
    const profile = this.sessionService.getCurrentProfile();

    const pendingSteps = Array.from(RegistrationStepMaps.values());

    if (currentUser.role) {
      pendingSteps.splice(
        RegistrationStepMaps.get(RegistrationSteps.RoleDefinition),
        1
      );
    }

    if (!profile) {
      this.steps = pendingSteps;
      return;
    }

    if (profile.firstName && profile.lastName) {
      pendingSteps.splice(
        RegistrationStepMaps.get(RegistrationSteps.PersonalData)
      ),
        1;
    }

    if (profile.location) {
      pendingSteps.splice(
        RegistrationStepMaps.get(RegistrationSteps.LocationData)
      ),
        1;
    }

    this.steps = pendingSteps;
  }

  get isRoleStep() {
    return this.currentStep.name === RegistrationSteps.RoleDefinition;
  }

  get isPersonalDataStep() {
    return this.currentStep.name === RegistrationSteps.PersonalData;
  }

  get isLocationDataStep() {
    return this.currentStep.name === RegistrationSteps.LocationData;
  }

  get isProfessionalDataStep() {
    return this.currentStep.name === RegistrationSteps.ProfessionalData;
  }

  get isCategoryStep() {
    return this.currentStep.name === RegistrationSteps.Categories;
  }

  get currentStep(): Step {
    return this.stepperService.currentStep;
  }
}
