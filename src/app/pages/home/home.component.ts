import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { SearchComponent } from '../../commons/components/search/search.component';
import { ArticleComponent } from '../../commons/components/article/article.component';
import { CommonModule } from '@angular/common';
import { ArticleSearchService } from './services/article-search.service';
import { Item } from '../../commons/interfaces/item';
import { Article } from '../../commons/interfaces/article';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { LoaderService } from '../../commons/services/loader.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchComponent,
    ArticleComponent,
    CommonModule,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit, AfterViewInit {


  @ViewChild('SearchComponent') miInput!: SearchComponent;

  articlesTracked: Item[] = [];
  articlesTop: Article[] = [];


  constructor(
    private readonly articleSearchService: ArticleSearchService,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    this.articleSearchService.getTop()
      .subscribe(articles => this.articlesTop = articles);
  }

  isFocusModal = false;
  onFocus() {
    this.isFocusModal = !this.isFocusModal;
    if (!this.isFocusModal) {
      this.miInput.removeFocus();
    }
  }

  onSearch(query: string) {
    this.articleSearchService.findAllByQuery(query)
      .subscribe(articles => {
        this.articlesTracked = articles.map(article => ({ id: article.id, value: article.title }));
      });
  }

  onSelected(item: Item) {
    this.router.navigate(['/blog/', item.id]);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: KeyboardEvent): void {
    this.isFocusModal = false;
    this.miInput.removeFocus();
  }

  ngAfterViewInit(): void {
    this.miInput.removeFocus();
  }


}