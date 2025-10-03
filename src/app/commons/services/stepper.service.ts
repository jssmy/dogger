import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepperService {

  indexStep = signal(0);

}
