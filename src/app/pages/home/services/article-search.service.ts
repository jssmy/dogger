import { Injectable } from '@angular/core';
import { filter, from, map, Observable, of } from 'rxjs';
import { Article } from '../../../commons/interfaces/article';
import { MathUtil } from '../../../commons/utils/math.util';
const ARTICLES_DUMMY: Article[] = require('./../../../commons/dummy/articles.json')


@Injectable({
  providedIn: 'root'
})
export class ArticleSearchService {


  findById(id: string): Observable<Article> {
    return from<Article[]>(ARTICLES_DUMMY)
    .pipe(
      filter(article => article.id === id)
    );
  }

  findAllByQuery(query: string): Observable<Article[]> {
    return of<Article[]>(ARTICLES_DUMMY)
      .pipe(
        map(articles => this.articleMatched(query.toLowerCase().trim(), articles)),
      );
  }

  getTop(): Observable<Article[]> {
    const size = 6;
    const startIn = MathUtil.ramdom(0,ARTICLES_DUMMY.length - size);
    return of<Article[]>([...ARTICLES_DUMMY].slice(startIn, startIn + size));
  }

  getSuggest(id: string): Observable<Article[]> {
    const article = ARTICLES_DUMMY.find(articleDummy => articleDummy.id === id);
    const articles = ARTICLES_DUMMY.filter(articleDummy => articleDummy.keywords.some(keyDummy => article?.keywords.includes(keyDummy) )).slice(0,3);
    return of(articles);
  }


  private articleMatched(query: string, article: Article[]): Article[] {
      const querySplit = query.split(' ');
      return article.filter(article => querySplit.some(split => article.keywords.includes(split.trim())))
      .slice(0, 8);
  }

}
