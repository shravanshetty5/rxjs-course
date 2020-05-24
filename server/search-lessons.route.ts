


import { Request, Response } from 'express';
import { setTimeout } from "timers";
import { LESSONS } from "./db-data";



export function searchLessons(req: Request, res: Response) {

    const queryParams = req.query;

    const courseId = queryParams.courseId as string,
          filter = queryParams.filter as string || '',
          sortOrder = queryParams.sortOrder || 'asc',
          // tslint:disable-next-line: radix
          pageNumber = parseInt(queryParams.pageNumber as string) || 0,
          // tslint:disable-next-line: radix
          pageSize = parseInt(queryParams.pageSize as string) || 3;

    let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId === +courseId).sort((l1, l2) => l1.id - l2.id);

    if (filter) {
       lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
        lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: lessonsPage});
    },1000);


}
