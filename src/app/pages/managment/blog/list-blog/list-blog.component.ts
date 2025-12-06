import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../../../commons/services/blog.service';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-list-blog',
    imports: [RouterModule],
    templateUrl: './list-blog.component.html',
    styleUrl: './list-blog.component.scss'
})
export default class ListBlogComponent {


  private readonly blogService  = inject(BlogService);
  private readonly isPlataformBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly getBlogs = toSignal(this.blogService.getBlogs());

  readonly blogs = computed(() => {
    if(this.isPlataformBrowser) {
      
      const blogs = this.getBlogs();

      return blogs;
      
    }

    return [];
  });

  



}
