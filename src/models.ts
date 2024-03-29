export interface Presentation {
    title: string;
    presenter: string;
    tags: string[];
}

export type MeetingType = 'SLUUG' | 'STLLUG';

export interface Image {
    url: string;
    alt: string;
}
