export interface Article {
    images: string[];
    id: string;
    title: string;
    summary: string;
    ownderName: string;
    duration: number;
    keywords: string[];
    createdAt: Date;
    postedAt: Date;
    updatedAt: Date;
}
