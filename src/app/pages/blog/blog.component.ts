import { Component, ComponentFactoryResolver, inject, input, makeStateKey, OnInit, PLATFORM_ID, signal, TransferState, ViewContainerRef } from '@angular/core';
import { FooterComponent } from "../../commons/components/footer/footer.component";
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BlogService } from '../../commons/services/blog.service';
import Parser from '@herii/editorjs-parser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomParser } from '../../commons/utils/parser.util';
import Error404Component from "../errors/error-404/error-404.component";
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { NAVBAR_HOME_ITEMS } from '../../commons/dummy/navbar-home-items';
import { NavbarItem } from '../../commons/interfaces/navbar-items';
import { AvatarWriterComponent } from '../../commons/components/avatar-writer/avatar-writer.component';
import { splitHTMLHeader } from '../../commons/utils/string.util';
import { BlogWriter } from '../../commons/interfaces/blog-writer';
const transferHtmlKey = makeStateKey<string>('html')




@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FooterComponent, CommonModule, Error404Component, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export default class BlogComponent implements OnInit{
    id = input<string>();    
    blogContainer = signal<SafeHtml | null>(null);
    avatar = signal<SafeHtml | null>(null);
    isResourceFound = signal<boolean>(true);

    private readonly plataformId = inject(PLATFORM_ID);
    private readonly blogService = inject(BlogService);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly transferState = inject(TransferState);
    private readonly viewContainer = inject(ViewContainerRef);
    navbarItems: NavbarItem[] = NAVBAR_HOME_ITEMS;
    


    ngOnInit(): void {
      if (this.transferState.hasKey(transferHtmlKey)) {
        const contentHTML = this.sanitizer.bypassSecurityTrustHtml(
          this.transferState.get<string>(transferHtmlKey, '')
        );
        this.blogContainer.set(contentHTML);

      }  else {
        this.isResourceFound.set(false)

      }
      if (this.id() && isPlatformServer(this.plataformId)) {
          this.blogService.getPublicBlog(this.id() as string).subscribe({
            next: content => {
              
              const html = new CustomParser().parse(content.blog);
              const finalHTML = this.finalHTML(html, content.writer);
              const contentHTML = this.sanitizer.bypassSecurityTrustHtml(finalHTML);

              this.blogContainer.set(contentHTML);
              this.transferState.set(transferHtmlKey, finalHTML);
              this.isResourceFound.set(true);
             },
             error: () => this.isResourceFound.set(false)
          })
      }
      
    }

    private finalHTML(contentHTML: string, blogWriter: BlogWriter) {
      const avatar = this.viewContainer.createComponent(AvatarWriterComponent);
      avatar.setInput('writer', blogWriter);
      avatar.changeDetectorRef.detectChanges();
      const avatarHTML = avatar.location.nativeElement.innerHTML;

      const splitHTML = splitHTMLHeader(contentHTML);
      avatar.destroy();
      return  `${splitHTML.header}
              ${avatarHTML}
              ${splitHTML.content}`;
    }


}
