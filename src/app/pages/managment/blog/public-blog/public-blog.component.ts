import { Component, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from '../../../../commons/services/blog.service';
import { isPlatformBrowser } from '@angular/common';
import { StepperService } from '../../../../commons/services/stepper.service';
import { CustomParser } from '../../../../commons/utils/parser.util';
import Error404Component from '../../../errors/error-404/error-404.component';
import { Router } from '@angular/router';
import { ALERT_ERROR_MOVE_BLOG_STAGE } from '../../../../commons/constants/alerts/alert-error-move-blog-stage';
import Swal from 'sweetalert2';
import { ALERT_SUCCESS_DRAFT } from '../../../../commons/constants/alerts/alert-success-draft';

@Component({
  selector: 'app-public-blog',
  imports: [
    ButtonComponent,
    Error404Component,
  ],
  templateUrl: './public-blog.component.html',
  styleUrl: './public-blog.component.scss',
})
export default class PublicBlogComponent implements OnInit {

  readonly id = input<string>();
  readonly blogContainer = signal<SafeHtml | null>(null);
  readonly isResourceFound = signal<boolean>(true);

  private readonly plataformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly blogService = inject(BlogService);
  private readonly stepperService = inject(StepperService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.stepperService.indexStep.set(2);
      if (this.id()) {
        this.blogService.getPublicBlog(this.id() as string).subscribe({
          next: (content) => {

            const html = new CustomParser().parse(content.blog);
            this.blogContainer.set(this.sanitizer.bypassSecurityTrustHtml(html));
            this.isResourceFound.set(true);

          },
          error: () => this.isResourceFound.set(false),
        });
      }
    }
  }


  backDraft() {
    this.blogService.toDraft(this.id() as string).subscribe({
      error: () => Swal.fire(ALERT_ERROR_MOVE_BLOG_STAGE),
      next: () => {
        Swal.fire(ALERT_SUCCESS_DRAFT)
          .finally(() => {
            console.log('$$$$');
            this.router.navigate(['/managment/blog/draft', this.id()]).finally();
          });

      },
    });

  }


}
