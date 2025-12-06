import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, inject, PLATFORM_ID, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticleComponent } from '../../commons/components/article/article.component';
import { FooterComponent } from '../../commons/components/footer/footer.component';
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { SearchComponent } from '../../commons/components/search/search.component';
import { ShimmerComponent } from '../../commons/components/shimmer/shimmer.component';
import { NAVBAR_HOME_ITEMS } from '../../commons/dummy/navbar-home-items';
import { Item } from '../../commons/interfaces/item';
import { NavbarItem } from '../../commons/interfaces/navbar-items';
import { ArticleSearchService } from './services/article-search.service';

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
