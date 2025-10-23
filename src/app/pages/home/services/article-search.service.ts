import { Injectable, inject } from '@angular/core';
import { filter, from, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../../commons/interfaces/article';
import { BlogPreview } from '../../../commons/interfaces/blog-preview';
import { environment } from '../../../../environments/environment';
import { MathUtil } from '../../../commons/utils/math.util';
import { PagintationResponse } from '../../../commons/interfaces/pagintation-response';
const ARTICLES_DUMMY: Article[] = require('./../../../commons/dummy/articles.json')


@Injectable({
  providedIn: 'root'
})
export class ArticleSearchService {

  private readonly http = inject(HttpClient);

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
    return this.http.get<PagintationResponse<BlogPreview[]>>(environment.blog)
      .pipe(
        map(response => response.data.map(blogPreview => this.mapBlogPreviewToArticle(blogPreview)))
      );
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

  private mapBlogPreviewToArticle(blogPreview: BlogPreview): Article {
    return {
      id: blogPreview.slug,
      title: blogPreview.title,
      summary: blogPreview.description,
      ownderName: '', // This will need to be populated from the user service
      duration: blogPreview.time,
      keywords: [], // This will need to be extracted from the blog content or added to BlogPreview
      images: blogPreview.imageUrl ? [blogPreview.imageUrl] : [],
      createdAt: new Date(),
      postedAt: new Date(),
      updatedAt: new Date()
    };
  }

}
