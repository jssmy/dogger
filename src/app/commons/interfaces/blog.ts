
interface Meta {
    checked?: boolean;
    counterType?: string;
}

interface Item {
    content: string;
    meta: Meta;
    items: Item[];
}

interface Data {
    text?: string;
    level?: number;
    url?: string;
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
    code?: string;
    title?: string;
    message?: string;
    style?: string;
    meta?: Meta;
    items?: Item[];
}

export interface Block {
    id: string;
    type: string;
    data: Data;
}


export enum BlogStage {  

    EDIT = 'edit',

    DRAFT = 'draft',

    PUBLIC = 'public'

}

export interface Blog {
    slug?: string;
    stage: BlogStage;
    blocks: Block[];
    version: string;
    time: number;
    title?: string;
    userId: string;
}
