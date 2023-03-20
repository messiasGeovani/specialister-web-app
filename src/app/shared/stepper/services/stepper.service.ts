import { Injectable } from '@angular/core';
import { Step } from '../models/step';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  steps: Step[];

  constructor() {}

  mountSteps(steps: string[]) {
    this.steps = steps.map((step, index) => ({
      name: step,
      isActive: index === 0,
      hasDone: false,
    }));
  }

  nextStep() {
    const currentStepIndex = this.steps.indexOf(this.currentStep);

    this.steps[currentStepIndex].hasDone = true;
    this.steps[currentStepIndex].isActive = false;

    if (!this.steps[currentStepIndex + 1]) {
      return;
    }

    this.steps[currentStepIndex + 1].isActive = true;
  }

  goBack() {
    const currentStepIndex = this.steps.indexOf(this.currentStep);

    if (currentStepIndex === 0) {
      return;
    }

    this.steps[currentStepIndex].isActive = false;
    this.steps[currentStepIndex - 1].hasDone = true;
    this.steps[currentStepIndex - 1].isActive = true;
  }

  clearSteps() {
    this.steps = [];
  }

  get currentStep(): Step {
    return this.steps.find((step) => !!step.isActive) as Step;
  }
}
