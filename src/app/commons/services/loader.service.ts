import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  private $status = signal(false);

  constructor() {}

  active() {
    this.$state.set(true);
  }

  inactive() {
    this.$state.set(false);
  }

  get $state() {
    return this.$status;
  }
}
