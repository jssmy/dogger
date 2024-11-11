import { TestBed } from '@angular/core/testing';

import { ArticleSearchService } from './article-search.service';

describe('ArticleSearchService', () => {
  let service: ArticleSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
