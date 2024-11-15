import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  private $statusSignal = signal(false);
  private $messageSignal = signal('LOADING');

  constructor() {}

  active(message: string = 'LOADING') {
    this.$messageSignal.set(message);
    this.$state.set(true);
  }

  inactive() {
    timer(1000).subscribe(() => this.$state.set(false));
  }

  get $state() {
    return this.$statusSignal;
  }

  get $message() {
    return this.$messageSignal;
  }
}
