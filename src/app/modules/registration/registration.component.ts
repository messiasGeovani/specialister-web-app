import { Component, OnInit } from '@angular/core';
import { Step } from 'src/app/shared/stepper/models/step';
import { StepperService } from 'src/app/shared/stepper/services/stepper.service';
import { RegistrationSteps } from './enums/registration-steps.enum';
import { RegistrationStepMaps } from './maps/Registration-steps.map';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  steps: string[];

  constructor(private stepperService: StepperService) {
    this.steps = Array.from(RegistrationStepMaps.values());
  }

  ngOnInit(): void {
    this.stepperService.mountSteps(this.steps);
  }

  get isRoleStep() {
    return this.currentStep.name === RegistrationSteps.RoleDefinition;
  }

  get isPersonalDataStep() {
    return this.currentStep.name === RegistrationSteps.PersonalData;
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
