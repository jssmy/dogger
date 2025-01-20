import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BehaviorSubject, map, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  private plataformId = inject(PLATFORM_ID);
  private $statusSignal = signal(false);
  private $messageSignal = signal('LOADING');

  constructor() {}

  active(message: string = 'LOADING') {
    this.$messageSignal.set(message);
    this.$state.set(true);
  }

  inactive(time: number = 500) {
    if (isPlatformBrowser(this.plataformId))  {
      setTimeout(() => {
        this.$state.set(false)
      }, time);
    }
    
  }

  get $state() {
    return this.$statusSignal;
  }

  get $message() {
    return this.$messageSignal;
  }
}
