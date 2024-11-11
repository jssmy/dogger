import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './commons/components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, timer } from 'rxjs';
import { LoaderService } from './commons/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dogger';

  

  constructor(
    readonly loader: LoaderService
  ) {}
}
