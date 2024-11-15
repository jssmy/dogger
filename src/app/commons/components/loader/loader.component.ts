import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {


  @ViewChild('container') container!: ElementRef;


  constructor(
    readonly loader: LoaderService
  ) {}

}
