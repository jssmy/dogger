import { Component, input } from '@angular/core';
import { BlogWriter } from '../../interfaces/blog-writer';

@Component({
    selector: 'bgz-avatar-writer',
    imports: [],
    templateUrl: './avatar-writer.component.html',
    styleUrl: './avatar-writer.component.scss'
})
export class AvatarWriterComponent {
  writer = input.required<BlogWriter>();
}
