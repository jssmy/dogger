import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CreateBlogPresenter } from './create-blog.presenter';
import EditorJS  from '@editorjs/editorjs';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../../commons/components/button/button.component';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export default class CreateBlogComponent implements OnInit {
  blogPresenter = inject(CreateBlogPresenter);
  editor: EditorJS | null = null;
  plataformId = inject(PLATFORM_ID);
  


  ngOnInit(): void {
    if (isPlatformBrowser(this.plataformId))   {
      this.initializeEditor();
    }
    
  }

  initializeEditor() {
    this.blogPresenter.getConfig('editor-container')
    .then(config =>{
      this.editor = new EditorJS(config);

    })
  }
  

  save() {
    this.editor?.save()
    .then(data => console.log(data));
  }

}
