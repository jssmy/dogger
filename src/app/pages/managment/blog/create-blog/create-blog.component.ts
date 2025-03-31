import { Component, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { CreateBlogPresenter } from './create-blog.presenter';
import EditorJS from '@editorjs/editorjs';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../../commons/components/button/button.component';
import { BlogService } from '../../../../commons/services/blog.service';
import { Blog, BlogStage } from '../../../../commons/interfaces/blog';
import Swal from 'sweetalert2';
import { ALERT_MIN_BLOCKS } from '../../../../commons/constants/alerts/alert-min-blocks';
import { StepperService } from '../../../../commons/services/stepper.service';
import { Router } from '@angular/router';
import { ALERT_SUCCESS_DRAFT } from '../../../../commons/constants/alerts/alert-success-draft';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export default class CreateBlogComponent implements OnInit {

  editor: EditorJS | null = null;
  private readonly blogPresenter = inject(CreateBlogPresenter);
  private readonly plataformId = inject(PLATFORM_ID);
  private readonly blogService = inject(BlogService);
  private readonly stepperService = inject(StepperService);
  private readonly routerService = inject(Router);
  slug = input<string>();



  ngOnInit(): void {
    if (isPlatformBrowser(this.plataformId)) {

      this.stepperService.indexStep.set(0);
      this.initializeEditor();

    }

  }

  initializeEditor() {
    this.blogPresenter.getConfig('editor-container')
      .then(config => {
        
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

        

        /// load editar data
      })
  }


  save() {
    this.editor?.save()
      .then((data: any) => {
        const blog = data as Blog;
        if (blog.blocks.length < 5) {
          Swal.fire(ALERT_MIN_BLOCKS);
        } else {
          this.blogService.create({
            ...blog,
            stage: BlogStage.DRAFT
           }).subscribe(blog => {
            Swal.fire(ALERT_SUCCESS_DRAFT)
            .then(() => this.routerService.navigate(['managment','blog','draft', blog.slug]))
          })
        }
      });
  }





}
