import { Component, inject, input, makeStateKey, OnInit, PLATFORM_ID, signal, TransferState, ViewContainerRef } from '@angular/core';
import { FooterComponent } from "../../commons/components/footer/footer.component";
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BlogService } from '../../commons/services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CustomParser } from '../../commons/utils/parser.util';
import Error404Component from "../errors/error-404/error-404.component";
import Error500Component from "../errors/error-500/error-500.component";
import { NavbarComponent } from '../../commons/components/navbar/navbar.component';
import { NAVBAR_HOME_ITEMS } from '../../commons/dummy/navbar-home-items';
import { NavbarItem } from '../../commons/interfaces/navbar-items';
import { AvatarWriterComponent } from '../../commons/components/avatar-writer/avatar-writer.component';
import { splitHTMLHeader } from '../../commons/utils/string.util';
import { BlogWriter } from '../../commons/interfaces/blog-writer';
import { TimeoutError } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
const transferHtmlKey = makeStateKey<string>('html')
const transferStatusErrorKey = makeStateKey<HttpStatusCode>('statusError')




@Component({
  selector: 'app-blog',
  imports: [FooterComponent, CommonModule, Error404Component, Error500Component, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export default class BlogComponent implements OnInit {
  id = input<string>();
  blogContainer = signal<SafeHtml | null>(null);
  avatar = signal<SafeHtml | null>(null);

  readonly statusError = signal<HttpStatusCode>(HttpStatusCode.NoContent);
  readonly httpStatusCode = HttpStatusCode;

  isResourceFound = signal<boolean>(true);
  isTimeoutError = signal<boolean>(false);

  private readonly plataformId = inject(PLATFORM_ID);
  private readonly blogService = inject(BlogService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly transferState = inject(TransferState);
  private readonly viewContainer = inject(ViewContainerRef);
  navbarItems: NavbarItem[] = NAVBAR_HOME_ITEMS;



  ngOnInit(): void {
    // Inicializar statusError desde TransferState si existe
    if (this.transferState.hasKey(transferStatusErrorKey)) {
      const serverStatusError = this.transferState.get<HttpStatusCode>(transferStatusErrorKey, HttpStatusCode.NoContent);
      this.statusError.set(serverStatusError as HttpStatusCode);
    }

    if (this.transferState.hasKey(transferHtmlKey)) {
      const contentHTML = this.sanitizer.bypassSecurityTrustHtml(
        this.transferState.get<string>(transferHtmlKey, '')
      );
      this.blogContainer.set(contentHTML);
      this.statusError.set(HttpStatusCode.Ok);
    }


    if (this.id() && isPlatformServer(this.plataformId)) {
      this.blogService.getPublicBlog(this.id() as string).subscribe({
        next: content => {
          console.log(content);
          const html = new CustomParser().parse(content.blog);
          const finalHTML = this.finalHTML(html, content.writer);
          const contentHTML = this.sanitizer.bypassSecurityTrustHtml(finalHTML);

          this.blogContainer.set(contentHTML);
          this.transferState.set(transferHtmlKey, finalHTML);
          this.statusError.set(HttpStatusCode.Ok);
        },
        error: (error) => {
          console.error(error);
          // Verificar si es un error de timeout
          if (error instanceof TimeoutError) {
            this.statusError.set(HttpStatusCode.InternalServerError);
            this.transferState.set(transferStatusErrorKey, HttpStatusCode.InternalServerError);
          } else {
            if (error.status === HttpStatusCode.NotFound) {
              this.statusError.set(HttpStatusCode.NotFound);
              this.transferState.set(transferStatusErrorKey, HttpStatusCode.NotFound);
            } else {
              this.statusError.set(HttpStatusCode.InternalServerError);
              this.transferState.set(transferStatusErrorKey, HttpStatusCode.InternalServerError);
            }

            console.warn(error);
          }
        }
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
    return `${splitHTML.header}
              ${avatarHTML}
              ${splitHTML.content}`;
  }


}
