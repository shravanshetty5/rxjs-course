import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Course } from '../app.types';
import { debug, RxjsLoggingLevel } from '../common/debug';
import { fetchDataFromUrl } from '../common/util';
import { Lesson } from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;
    courseId: string;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {
      this.courseId = this.route.snapshot.params['id'];
      this.course$ = fetchDataFromUrl(`/api/courses/${this.courseId}`).pipe(
        debug(RxjsLoggingLevel.INFO, 'course value')
      );
    }

    ngAfterViewInit() {
      this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debug(RxjsLoggingLevel.TRACE, 'search'),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search)),
        debug(RxjsLoggingLevel.DEBUG, 'lessons value')
        );
      }


    loadLessons(search = ''): Observable<Lesson[]> {
      return fetchDataFromUrl(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(map(resp => resp['payload']));
    }




}
