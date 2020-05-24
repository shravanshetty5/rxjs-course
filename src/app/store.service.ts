import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { delayWhen, filter, map, retryWhen, take, tap } from 'rxjs/operators';
import { createHttpObservable } from './common/util';
import { Course, courseCatergory } from './model/course';

@Injectable({
  providedIn: 'root'
})
export class Store {
  private subject = new BehaviorSubject([]);
  private coursesLoaded = false;
  courses$: Observable<Course[]> = this.subject.asObservable();


  selectBeginnerCourses(): Observable<Course[]> {
    return this.filterByCategory(courseCatergory.beginner);
  }

  selectAdvanceCources(): Observable<Course[]> {
    return this.filterByCategory(courseCatergory.advanced);
  }

  private filterByCategory(category: string) {
    return this.courses$.pipe(
      map(courses => courses
          .filter(course => course.category === category))
    );
  }

  selectCourseById(courseId: number): Observable<Course> {
    return this.courses$.pipe(
      map(courses => courses.find(course => course.id === courseId)),
      filter(course => !!course)
    );
  }

  saveCourse(id: number, value: any) {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex(course => course.id === id);
    const newCourses = courses.slice(0);

    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...value
    };

    return fromPromise(fetch(`/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(value),
      headers: {
        'content-type': 'application/json'
      }
    }))
    .pipe(
      tap(() => this.subject.next(newCourses))
    );
  }


  dispatchgetCourses() {
    if (!this.coursesLoaded) {
      createHttpObservable('/api/courses')
        .pipe(
          tap(() => console.log('HTTP request executed')),
          map(res => Object.values(res['payload']) ),
          retryWhen(errors =>
              errors.pipe(
              delayWhen(() => timer(2000)
              )
          )),
          take(3)
        ).subscribe((courses: Course[]) => {
          this.subject.next(courses);
          this.coursesLoaded = true;
        });
    }
  }
}
