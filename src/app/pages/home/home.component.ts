import { AfterViewInit, Component, HostListener, inject, resource, viewChild, ViewChild, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { SearchComponent } from '../../commons/components/search/search.component';
import { ArticleComponent } from '../../commons/components/article/article.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ArticleSearchService } from './services/article-search.service';
import { Item } from '../../commons/interfaces/item';
import { Article } from '../../commons/interfaces/article';
import { Router } from '@angular/router';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { NavbarItem } from '../../commons/interfaces/navbar-items';
import { NAVBAR_HOME_ITEMS } from '../../commons/dummy/navbar-home-items';
import { toSignal } from '@angular/core/rxjs-interop';
import { lastValueFrom, of } from 'rxjs';
import { ShimmerComponent } from '../../commons/components/shimmer/shimmer.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    SearchComponent,
    ArticleComponent,
    CommonModule,
    FooterComponent,
    ShimmerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements AfterViewInit {
  private readonly articleSearchService = inject(ArticleSearchService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  readonly searchComponent = viewChild<SearchComponent>('SearchComponent');

  articlesTracked: Item[] = [];
  readonly articlesTop = toSignal(
    isPlatformBrowser(this.platformId) 
      ? this.articleSearchService.getTop() 
      : of([])
  );

  navbarItems: NavbarItem[] = NAVBAR_HOME_ITEMS;

  isFocusModal = false;
  onFocus() {
    this.isFocusModal = !this.isFocusModal;
    if (!this.isFocusModal) {
      this.searchComponent()?.removeFocus();
    }
  }

  onSearch(query: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.articleSearchService.findAllByQuery(query)
        .subscribe(articles => {
          this.articlesTracked = articles.map(article => ({ id: article.id, value: article.title }));
        });
    }
  }

  onSelected(item: Item) {
    this.router.navigate(['/blog/', item.id]);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(_event: KeyboardEvent): void {
    this.isFocusModal = false;
    this.searchComponent()?.removeFocus();
  }

  ngAfterViewInit(): void {
    this.searchComponent()?.removeFocus();
  }


}
