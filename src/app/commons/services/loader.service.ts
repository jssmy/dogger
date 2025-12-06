import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  private plataformId = inject(PLATFORM_ID);
  private $statusSignal = signal(false);
  private $messageSignal = signal('LOADING');

  active(message = 'LOADING') {
    this.$messageSignal.set(message);
    this.$state.set(true);
  }

  inactive(time = 500) {
    if (isPlatformBrowser(this.plataformId)) {

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
