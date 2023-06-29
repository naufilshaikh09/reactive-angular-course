import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]
})
export class CourseDialogComponent implements AfterViewInit {

  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesStore: CoursesStore,
    // private coursesService: CoursesService,
    // private loadingService: LoadingService,
    private messagesService: MessagesService) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

    // this.loadingService.loadingOn();

  }

  ngAfterViewInit() {
  }

  save() {

    const changes = this.form.value;
    // const saveCourse$ = this.coursesService.saveCourse(this.course.id, changes)
    //   .pipe(
    //     catchError(err => {
    //       const message = "Couldn't save course";
    //       console.log(message, err);
    //       this.messagesService.showErrors(message);
    //       return throwError(err);
    //     })
    //   )

    // this.loadingService.showLoaderUntilCompleted(saveCourse$)
    //   .subscribe(
    //     val => {
    //       this.dialogRef.close(val);
    //     }
    //   );

    this.coursesStore.saveCourse(this.course.id, changes)
      // .pipe(
      //   catchError(err => {
      //     const message = "Couldn't save course";
      //     console.log(message, err);
      //     this.messagesService.showErrors(message);
      //     return throwError(err);
      //   })
      // )
      .subscribe();

    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }

}
