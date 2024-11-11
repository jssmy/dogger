import { Component, input, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent  {
  article = input.required<Article>();

}
