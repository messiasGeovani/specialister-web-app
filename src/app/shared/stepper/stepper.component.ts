import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Step } from './models/step';
import { StepperService } from './services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, OnDestroy {
  @Input('steps') stepNames?: string[];

  constructor(private stepperService: StepperService) {}

  ngOnInit(): void {
    if (!this.stepNames || !this.stepNames.length) {
      return;
    }

    this.stepperService.mountSteps(this.stepNames as string[]);
  }

  ngOnDestroy(): void {
    this.stepperService.clearSteps();
  }

  get steps(): Step[] {
    return this.stepperService.steps;
  }
}
