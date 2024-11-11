import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { ArticleComponent } from '../../commons/components/article/article.component';
import { ActivatedRoute } from '@angular/router';
import { ArticleSearchService } from '../home/services/article-search.service';
import { Article } from '../../commons/interfaces/article';
import { FooterComponent } from '../../commons/components/footer/footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    NavbarComponent,
    ArticleComponent,
    FooterComponent
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export default class BlogComponent implements OnInit{


  id!: string;
  articlesSuggest: Article[] = [];
  article!: Article;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly articleSearchService: ArticleSearchService

  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.articleSearchService.getSuggest(this.id)
    .subscribe(articles => this.articlesSuggest = articles);

    this.articleSearchService.findById(this.id)
    .subscribe(article => this.article =  article);
  }
  
}
