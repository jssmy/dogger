export const trim = (str: string, charToTrim: string) => {

    if (!str) {
        return '';
    }

    const regex = new RegExp(`^[${charToTrim}]+|[${charToTrim}]+$`, 'g');
    return str.replace(regex, '');
};

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
        const content = htmlString.replace(header, "").trim(); // Elimina el encabezado del contenido

        return { header, content };
    }

    return { header: '', content: htmlString };
}

export function capitalizeFirstLetter(value: string): string {
    if (!value) {
        return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function capitalizeWords(value: string): string {
    if (!value) {
        return '';
    }
    return value
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export function toCamelCase(value: string): string {
    if (!value) {
        return '';
    }
    return value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

export function toPascalCase(value: string): string {
    if (!value) {
        return '';
    }
    const camelCase = value
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}
