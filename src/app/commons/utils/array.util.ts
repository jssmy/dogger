export const toFlatten = (key: string, items : any[]): string[] => {
    const jsonString = JSON.stringify(items);

    // Crear una expresión regular dinámica basada en el key proporcionado
    const regex = new RegExp(`"${key}":"(.*?)"`, "g");

    // Usar la expresión regular para extraer todos los valores del campo especificado por `key`
    return jsonString.match(regex)?.map(match => match.replace(new RegExp(`"${key}":"(.*?)"`), '$1')) || [];
};
