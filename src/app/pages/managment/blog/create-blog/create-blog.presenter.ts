import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DEFAULT_EDITOR_CONFIG } from '../commons/editor.config';
import { isPlatformBrowser } from '@angular/common';
import { EditorConfig } from '@editorjs/editorjs';
// @ts-ignore
import SimpleImage from '@editorjs/simple-image';

@Injectable({
  providedIn: 'root',
})
export class CreateBlogPresenter {

  plataformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.plataformId);


  async getConfig(id: string) {
    const { default: list } = await import('@editorjs/list');
    const { default: code } = await import('@editorjs/code');
    const { default: header } = await import('@editorjs/header');
    const { default: warning } = await import('@editorjs/warning');

    return {
      tools: {
        warning: {
          class: warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Título',
            messagePlaceholder: 'Mensaje',
          },
        },
        header: {
          class: header as any,
          shortcut: 'CMD+SHIFT+H',
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4],
            defaultLevel: 3,
          },

        },
        list,
        code,
        simpleImage: SimpleImage,
      },
      ...DEFAULT_EDITOR_CONFIG,
      holder: id,

    } as EditorConfig;
  }

}
