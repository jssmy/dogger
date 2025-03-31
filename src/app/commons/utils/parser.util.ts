import Parser from '@herii/editorjs-parser';


const renderList = (items: any[], tag: string): string  => {
    
    if (!items || items.length === 0) return '';
    
    return `<${tag}>${items?.map(
        (item) =>
          `<li>${item.content}${item.items && item.items.length > 0 ? renderList(item.items, tag) : ''}</li>`
      )
      ?.join('')}</${tag}>`;
    }

const listParser = (block: any): string =>  {
    if (!block?.items || !Array.isArray(block.items)) {
        console.error('Error: `items` no es un array válido', block?.data);
        return '';
    }

    console.log(block);

    return renderList(block.items, block.style === 'ordered' ? 'ol' : 'ul');
};


const renderWarning = (block: any) => {
    console.log(block);
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
export const sanitizeHtml = function(markup: string) {
    markup = markup.replace(/&/g, "&amp;");
    markup = markup.replace(/</g, "&lt;");
    markup = markup.replace(/>/g, "&gt;");
    return markup;
};

const codeParser = (data: any, config: any) => {
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


  const simpleImage = (data: any, config: any) => {
    const imageConditions = `${data.stretched ? "img-fullwidth" : ""} ${data.withBorder ? "img-border" : ""} ${data.withBackground ? "img-bg" : ""}`;
    const imgClass = config.simpleImage.imgClass || "";
    let imageSrc;

    if (data.url) {
      // simple-image was used and the image probably is not uploaded to this server
      // therefore, we use the absolute path provided in data.url
      // so, config.image.path property is useless in this case!
      imageSrc = data.url;
    } else if (config.simpleImage.path === "absolute") {
      imageSrc = data.file.url;
    } else {
      imageSrc = config.simpleImage.path.replace(
        /<(.+)>/,
        (match: any, p1: any) => data.file[p1]
      );
    }

    if (config.image.use === "img") {
      return `<img class="${imageConditions} ${imgClass}" src="${imageSrc}" alt="${data.caption}">`;
    }  if (config.simpleImage.use === "figure") {
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
 

const customParsers  = {
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