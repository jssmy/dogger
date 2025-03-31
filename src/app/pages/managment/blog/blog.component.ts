import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepperComponent } from "../../../commons/components/stepper/stepper.component";
import { Step } from '../../../commons/interfaces/step';
import { StepperService } from '../../../commons/services/stepper.service';

const STEPS: Step[] = require('./../../../commons/dummy/blog-stage.json');

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, StepperComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export default class BlogComponent {

  blogStages: Step[] = STEPS;

  stepperService = inject(StepperService);


}
