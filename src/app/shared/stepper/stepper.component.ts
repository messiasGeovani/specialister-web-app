import { Component, Input, OnInit } from '@angular/core';
import { Step } from './models/step';
import { StepperService } from './services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input('steps') stepNames: string[];

  constructor(private stepperService: StepperService) {}

  ngOnInit(): void {
    this.stepperService.mountSteps(this.stepNames);
  }

  get steps(): Step[] {
    return this.stepperService.steps;
  }
}
