import { Component, effect, input, OnInit } from '@angular/core';
import { BlogWriter } from '../../interfaces/blog-writer';

@Component({
    selector: 'app-avatar-writer',
    imports: [],
    templateUrl: './avatar-writer.component.html',
    styleUrl: './avatar-writer.component.scss'
})
export class AvatarWriterComponent {
  writer = input.required<BlogWriter>();
}
