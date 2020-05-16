import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from 'moment';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Course } from '../app.types';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course,
        ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });
    }

    ngOnInit() {
      this.form.valueChanges.pipe(
        concatMap(value => this.saveCourseDetails(value))
      ).subscribe();
    }

    private saveCourseDetails(value) {
      return from(fetch(`/api/courses/${this.course.id}`, {
        method: 'PUT',
        body: JSON.stringify(value),
        headers: {
          'content-type': 'application/json'
        }
      }));
    }



    ngAfterViewInit() {


    }



    close() {
        this.dialogRef.close();
    }

}
