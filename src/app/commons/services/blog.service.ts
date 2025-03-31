import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Blog, BlogStage } from '../interfaces/blog';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly http = inject(HttpClient);

  getPublicBlog(slug: string) {
    return this.http.get<Blog>(`${environment.blog}/public/${slug}`);
  }

  getDraftBlog(id: string) {
    return this.http.get<Blog>(`${environment.blog}/draft/${id}`);
  }

  create(blog: Blog) {
    return this.http.post<Blog>(`${environment.blog}`, blog);
  }

  update (blog: Partial<Blog>, slug: string) {
    return this.http.put(`${environment.blog}/${slug}`, blog);
  }

  private moveStage(stage: BlogStage, slug: string) {
    return this.update(
      {
        stage
      },
      slug
    )
  }

  toDraft(slug: string) {
    return this.moveStage(BlogStage.DRAFT, slug);
  }

  toPulic(slug: string) {
    return this.moveStage(BlogStage.PUBLIC, slug);
  }

  getBlogs() {
    return this.http.get<Blog[]>(`${environment.blog}/own`)
    .pipe(
      map(blogs => blogs.map(blog => ({
        ...blog,
        title: blog.blocks.find(block => block.type === 'header' )?.data.text
      })))
    );
  }

  

}
