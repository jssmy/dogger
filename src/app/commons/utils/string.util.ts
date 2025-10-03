export const trim = (str: string, charToTrim: string) => {

  if (!str) {
    return '';
  }

  const regex = new RegExp(`^[${charToTrim}]+|[${charToTrim}]+$`, 'g');
  return str.replace(regex, '');
};

// @ts-ignore: any
export function toQueryParams(obj: any) {
  if (obj) {
    return new URLSearchParams(obj).toString();
  }
  return '';

}


export function splitHTMLHeader(htmlString: string) {
  const regex = /<(h[1-5])[^>]*>(.*?)<\/\1>/i;
  const match = htmlString.match(regex);

  if (match) {
    const header = match[0]; // Captura la etiqueta completa
    const content = htmlString.replace(header, '').trim(); // Elimina el encabezado del contenido

    return { header, content };
  }

  return { header: '', content: htmlString };
}
