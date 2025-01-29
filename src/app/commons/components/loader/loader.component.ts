import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';


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
