import { Component, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { StepperService } from '../../../../commons/services/stepper.service';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from '../../../../commons/services/blog.service';
import { isPlatformBrowser } from '@angular/common';
import Error404Component from '../../../errors/error-404/error-404.component';
import { CustomParser } from '../../../../commons/utils/parser.util';
import Swal from 'sweetalert2';
import { ALERT_SUCCESS_PUBLIC } from '../../../../commons/constants/alerts/alert-success-public';
import { ALERT_ERROR_MOVE_BLOG_STAGE } from '../../../../commons/constants/alerts/alert-error-move-blog-stage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft-blog',
  imports: [ButtonComponent, Error404Component],
  templateUrl: './draft-blog.component.html',
  styleUrl: './draft-blog.component.scss',
})
export default class DraftBlogComponent implements OnInit {

  blogHtml: SafeHtml = '';
  readonly stepperService = inject(StepperService);
  readonly id = input<string>();
  readonly blogContainer = signal<SafeHtml | null>(null);
  readonly isResourceFound = signal<boolean>(true);
  private readonly plataformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly blogService = inject(BlogService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    console.log(this.id());
    if (isPlatformBrowser(this.plataformId)) {
      this.stepperService.indexStep.set(1);
      if (this.id()) {
        this.blogService.getDraftBlog(this.id() as string).subscribe({
          next: (content) => {

            const html = new CustomParser().parse(content);
            this.blogContainer.set(this.sanitizer.bypassSecurityTrustHtml(html));
            this.isResourceFound.set(true);

          },
          error: () => this.isResourceFound.set(false),
        });
      }
    }
  }

  movePublic() {
    this.blogService.toPulic(this.id() as string)
      .subscribe({
        error: () => Swal.fire(ALERT_ERROR_MOVE_BLOG_STAGE),
        next: () => {
          Swal.fire(ALERT_SUCCESS_PUBLIC)
            .finally(() => {

              this.router.navigate(['/managment/blog/public', this.id()]);
            });
        },
      });
  }

  moveEditing() {
    this.router.navigate(['/managment/blog/create', this.id()]).finally();
  }


}
