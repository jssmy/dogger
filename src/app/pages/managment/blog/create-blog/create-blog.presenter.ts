import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { DEFAULT_EDITOR_CONFIG } from "../commons/editor.config";
import { isPlatformBrowser } from "@angular/common";
import { EditorConfig } from "@editorjs/editorjs";

@Injectable({
    providedIn: 'root'
})
export class CreateBlogPresenter {

    plataformId = inject(PLATFORM_ID);
    isBrowser = isPlatformBrowser(this.plataformId);


    async getConfig(id: string) {
        const { default: List } = await import('@editorjs/list');
        const { default: Image } = await import('@editorjs/image');
        const { default: Code } = await import('@editorjs/code');
        const { default: Header } = await import('@editorjs/header');
        const { default: Warning } = await import('@editorjs/warning');

        return {
            tools: {
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+W',
                    config: {
                        titlePlaceholder: 'Título',
                        messagePlaceholder: 'Mensage',
                    },
                },
                header: {
                    class: Header as any,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4],
                        defaultLevel: 3
                    }

                },
                Code,
                List,
                Image: {
                    class: Image,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                        }
                    }

                }
            },
            ...DEFAULT_EDITOR_CONFIG,
            holder: id

        } as EditorConfig;
    }

}