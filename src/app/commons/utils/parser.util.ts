import Parser from '@herii/editorjs-parser';


interface ListItem {
    content: string;
    items?: ListItem[];
}

const renderList = (items: ListItem[], tag: string): string => {

    if (!items || items.length === 0) return '';

    return `<${tag}>${items?.map(
        (item) =>
            `<li>${item.content}${item.items && item.items.length > 0 ? renderList(item.items, tag) : ''}</li>`
    )
        ?.join('')}</${tag}>`;
}

const listParser = (block: { items: ListItem[]; style: string }): string => {
    if (!block?.items || !Array.isArray(block.items)) {
        return '';
    }

    return renderList(block.items, block.style === 'ordered' ? 'ol' : 'ul');
};


const renderWarning = (block: { title: string; message: string }) => {
    if (!block) {
        return '';
    }

    return `
        <div  style='background: none; color: white' class="alert alert-info d-flex align-items-center" role="alert">
        <image style='height: 100px;' src='/icons/warning.png'>
        <div>
            <h5 class="alert-heading">${block.title}</h5>
            <p>${block.message}</p>
        </div>
        </div>
    `;

}
export const sanitizeHtml = function (markup: string) {
    markup = markup.replace(/&/g, "&amp;");
    markup = markup.replace(/</g, "&lt;");
    markup = markup.replace(/>/g, "&gt;");
    return markup;
};

const codeParser = (data: { code: string }, config: { code: { codeBlockClass: string } }) => {
    const markup = sanitizeHtml(data.code);
    return `<div class='terminal'>
                <div class='terminal__bar'>
                    <div class=''>
                        <i class="fa-solid fa-circle terminal__bash_icon terminal__bash_icon--red"></i>
                        <i class="fa-solid fa-circle terminal__bash_icon terminal__bash_icon--yellow"></i>
                        <i class="fa-solid fa-circle terminal__bash_icon terminal__bash_icon--red"></i>
                        
                    </div>
                    <label class='terminal__title ms-lg-5 ms-1'>root@hardcodeando.com</label>
                </div>
                <pre class='terminal__block'><code class="${config.code.codeBlockClass}">${markup}</code></pre>
            </div>`;
};


const simpleImage = (data: {
    url?: string;
    file?: { url: string;[key: string]: string };
    caption: string;
    stretched?: boolean;
    withBorder?: boolean;
    withBackground?: boolean
}, config: {
    simpleImage: {
        imgClass?: string;
        path?: string;
        use?: string;
        figureClass?: string;
        figCapClass?: string
    };
    image: {
        use?: string
    }
}) => {
    const imageConditions = `${data.stretched ? "img-fullwidth" : ""} ${data.withBorder ? "img-border" : ""} ${data.withBackground ? "img-bg" : ""}`;
    const imgClass = config.simpleImage.imgClass || "";
    let imageSrc;

    if (data.url) {
        // simple-image was used and the image probably is not uploaded to this server
        // therefore, we use the absolute path provided in data.url
        // so, config.image.path property is useless in this case!
        imageSrc = data.url;
    } else if (config.simpleImage.path === "absolute") {
        imageSrc = data.file?.url || '';
    } else {
        imageSrc = config.simpleImage.path?.replace(
            /<(.+)>/,
            (_match: string, p1: string) => data.file?.[p1] || ''
        );
    }

    if (config.image.use === "img") {
        return `<img class="${imageConditions} ${imgClass}" src="${imageSrc}" alt="${data.caption}">`;
    } if (config.simpleImage.use === "figure") {
        const figureClass = config.simpleImage.figureClass || "";
        const figCapClass = config.simpleImage.figCapClass || "";
        return `<figure class="${figureClass} ${imageConditions}">
                <div>
                    <div class="image-container">
                        <img class="${imgClass}" src="${imageSrc}" alt="${data.caption}">
                        <figcaption class="${figCapClass}">${data.caption}</figcaption>
                    </div>
                </div>
            </figure>`;
    }
    return '';
};


const customParsers = {
    list: listParser,
    warning: renderWarning,
    code: codeParser,
    simpleImage
};






export class CustomParser extends Parser {


    constructor() {
        super({}, customParsers, {});
    }


}