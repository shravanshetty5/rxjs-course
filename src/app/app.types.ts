// Generated by https://quicktype.io

export interface CourcesResponse {
  payload: Course[];
}

export interface Course {
  id:              number;
  description:     string;
  iconUrl:         string;
  courseListIcon?: string;
  longDescription: string;
  category:        string;
  lessonsCount?:   number;
}

export enum CourseType {
  beginner = 'BEGINNER',
  advanced = 'ADVANCED'
}
