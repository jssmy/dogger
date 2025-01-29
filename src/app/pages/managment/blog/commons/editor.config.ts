export const DEFAULT_EDITOR_CONFIG = {
    placeholder: 'Escribe algo...', 
    /**
     * Internationalzation config
     */
    i18n: {
        /**
         * @type {I18nDictionary}
         */
        messages: {
            /**
             * Other below: translation of different UI components of the editor.js core
             */
            'ui': {
                'blockTunes': {
                    'toggler': {
                        'Click to tune': 'Haz clic para ajustar',
                        'or drag to move': 'o arrastra para mover'
                    }
                },
                'inlineToolbar': {
                    'converter': {
                        'Convert to': 'Convertir a'
                    }
                },
                'toolbar': {
                    'toolbox': {
                        'Add': 'Agregar'
                    }
                },
                list: {

                }
            },

            /**
             * Section for translation Tool Names: both block and inline tools
             */
            'toolNames': {
                'Text': 'Párrafo',
                'Heading': 'Encabezado',
                'List': 'Lista',
                'Warning': 'Advertencia',
                'Quote': 'Cita',
                'Code': 'Código',
                'Delimiter': 'Separador',
                'Raw HTML': 'HTML sin procesar',
                'Table': 'Tabla',
                'Link': 'Enlace',
                'Marker': 'Marcador',
                'Bold': 'Negrita',
                'Italic': 'Cursiva',
                'InlineCode': 'Código en línea',

            },

            /**
             * Section for passing translations to the external tools classes
             */
            'tools': {
                /**
                 * Cada subsección es el diccionario de internacionalización que será pasado al plugin correspondiente.
                 * El nombre del plugin debe coincidir con el nombre especificado en la sección 'tool' para ese plugin.
                 */
                'warning': { // <-- La herramienta 'Warning' aceptará esta sección del diccionario
                    'Title': 'Título',
                    'Message': 'Mensaje'
                },

                /**
                 * Link es una herramienta interna en línea
                 */
                'link': {
                    'Add a link': 'Agregar un enlace'
                },
                /**
                 * El 'stub' es una herramienta interna de bloque, usada para adaptar bloques que no tienen un plugin correspondiente
                 */
                'stub': {
                    'The block can not be displayed correctly.': 'El bloque no se puede mostrar correctamente.'
                },

            },


            /**
             * Section allows to translate Block Tunes
             */

            'blockTunes': {
                /**
                 * Cada subsección es el diccionario de internacionalización que será pasado al plugin correspondiente de ajustes de bloque.
                 * El nombre del plugin debe coincidir con el nombre especificado en la sección 'tunes' para ese plugin.
                 *
                 * Además, hay algunos ajustes de bloque internos: 'delete', 'moveUp' y 'moveDown'.
                 */
                'delete': {
                    'Delete': 'Eliminar'
                },
                'moveUp': {
                    'Move up': 'Mover arriba'
                },
                'moveDown': {
                    'Move down': 'Mover abajo'
                }
            },
        }
    }

};
