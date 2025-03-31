import { Component, inject, input, makeStateKey, OnInit, PLATFORM_ID, signal, TransferState } from '@angular/core';
import { FooterComponent } from "../../commons/components/footer/footer.component";
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BlogService } from '../../commons/services/blog.service';
import Parser from '@herii/editorjs-parser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomParser } from '../../commons/utils/parser.util';
import Error404Component from "../errors/error-404/error-404.component";
const transferHtmlKey = makeStateKey<string>('html')




@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FooterComponent, CommonModule, Error404Component],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export default class BlogComponent implements OnInit{
    id = input<string>();    
    blogContainer = signal<SafeHtml | null>(null);
    isResourceFound = signal<boolean>(true);

    private readonly plataformId = inject(PLATFORM_ID);
    private readonly blogService = inject(BlogService);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly transferState = inject(TransferState);

    ngOnInit(): void {
      if (this.transferState.hasKey(transferHtmlKey)) {
        this.blogContainer.set(this.sanitizer.bypassSecurityTrustHtml(this.transferState.get<string>(transferHtmlKey, '')));

      }  else {
        this.isResourceFound.set(false)

      }
      if (this.id() && isPlatformServer(this.plataformId)) {
          this.blogService.getPublicBlog(this.id() as string).subscribe({
            next: content => {
              
              const html = new CustomParser().parse(content);
              this.blogContainer.set(this.sanitizer.bypassSecurityTrustHtml(html));
              this.transferState.set(transferHtmlKey, html);
              this.isResourceFound.set(true);
             },
             error: () => this.isResourceFound.set(false)
          })
      }
      
    }


}
