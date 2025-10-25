import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { CreateBlogPresenter } from './create-blog.presenter';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { BlogService } from '../../../../commons/services/blog.service';
import { Blog, BlogStage } from '../../../../commons/interfaces/blog';
import { ALERT_MIN_BLOCKS } from '../../../../commons/constants/alerts/alert-min-blocks';
import { StepperService } from '../../../../commons/services/stepper.service';
import { Router } from '@angular/router';
import { ALERT_SUCCESS_DRAFT } from '../../../../commons/constants/alerts/alert-success-draft';
import { AlertService } from '../../../../commons/services/alert.service';

@Component({
    selector: 'app-create-blog',
    imports: [ButtonComponent],
    templateUrl: './create-blog.component.html',
    styleUrl: './create-blog.component.scss'
})
export default class CreateBlogComponent implements OnInit {

  editor: any = null;
  private readonly blogPresenter = inject(CreateBlogPresenter);
  private readonly plataformId = inject(PLATFORM_ID);
  private readonly blogService = inject(BlogService);
  private readonly stepperService = inject(StepperService);
  private readonly routerService = inject(Router);
  private readonly alertService = inject(AlertService);
  slug = input<string>();



  ngOnInit(): void {
    if (isPlatformBrowser(this.plataformId)) {

      this.stepperService.indexStep.set(0);
      this.initializeEditor();

    }

  }

  async initializeEditor() {
    const config = await this.blogPresenter.getConfig('editor-container');
    const { default: EditorJS } = await import('@editorjs/editorjs');
    
    if (this.slug()) {
      this.blogService.getDraftBlog(this.slug() as string).subscribe(blog => {
        this.editor = new EditorJS({
          ...config,
          data: blog
        });
      })
    } else {
      this.editor = new EditorJS({
        ...config
      });
    }
  }

  private createOrUpdateBlog(blog: Blog) {
    if (this.slug()) {
      this.blogService.update(blog, this.slug() as string).subscribe(blog => {
        this.alertService.fire(ALERT_SUCCESS_DRAFT).then(() => {
          this.routerService.navigate(['managment','blog','draft', this.slug() as string]);
        });
      })
    } else {
      this.blogService.create(blog).subscribe(blog => {
         this.alertService.fire(ALERT_SUCCESS_DRAFT).then(() => {
          this.routerService.navigate(['managment','blog','draft', blog.slug]);
        });
      })
    }
  }

  async save() {
    const data = await this.editor?.save();
    const blog = data as Blog;
    
    if (blog.blocks.length < 5) {
      await this.alertService.fire(ALERT_MIN_BLOCKS);
    } else {
      this.createOrUpdateBlog(blog);
    }
  }





}
