import { Component, computed, input, output } from '@angular/core';
import { Step } from '../../interfaces/step';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stepper',
    imports: [CommonModule],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss'
})
export class StepperComponent {

  steps = input.required<Step[]>();

  indexCurrentStep = input(0);

  selectedStep = output<Step | undefined>();

  stepsComputed = computed(() => {
    if (this.steps()) {

      const steps = this.steps().map((step, index) => {
        
        step.active = false;

        if (index <= this.indexCurrentStep()) {
          step.visited = true;
        }
        if (this.indexCurrentStep() === index) {
          return {
            ...step,
            active: true,
            visted: false
          }
        }

        return step;

      });

      return steps;
    }
    return this.steps();

  });

  witdhStepComputed = computed(() => {
    const per = (1 / this.steps().length) * 100;

    return `${per}%`;
  });

  onSelected(step: Step) {
    this.selectedStep.emit(step);
  }


}
