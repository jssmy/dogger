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