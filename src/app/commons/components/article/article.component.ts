import { Component, input } from '@angular/core';
import { Article } from '../../interfaces/article';

@Component({
    selector: 'bgz-article',
    imports: [],
    templateUrl: './article.component.html',
    styleUrl: './article.component.scss'
})
export class ArticleComponent  {
  article = input.required<Article>();

}
