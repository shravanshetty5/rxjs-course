

export interface Course {
    id:number;
    description:string;
    iconUrl: string;
    courseListIcon: string;
    longDescription: string;
    category:string;
    lessonsCount:number;
}

export enum courseCatergory {
  advanced = 'ADVANCED',
  beginner = 'BEGINNER'
}
