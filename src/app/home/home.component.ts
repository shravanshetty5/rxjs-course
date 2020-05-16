import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Course, CourseType } from '../app.types';
import { fetchDataFromUrl } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public beginnerCourse$: Observable<Course[]>;
  public advancedCourse$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

      const http$ = fetchDataFromUrl('/api/courses');

      const courses$ = http$.pipe(
        tap(() => console.log('Make Http requests')),
        map(resp => Object.values(resp.payload)),
        shareReplay()
      );

      this.beginnerCourse$ = courses$.pipe(
        map((resp: Course[]) => resp.filter((course: Course) => course.category === CourseType.beginner))
      );

      this.advancedCourse$ = courses$.pipe(
        map((resp: Course[]) => resp.filter(course => course.category === CourseType.advanced))
      );

    }

}
