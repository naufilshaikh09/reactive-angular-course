import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    // private coursesService: CoursesService,
    // private loadingService: LoadingService,
    // private messagesService: MessagesService,
    private coursesStore: CoursesStore
  ) {
  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {

    // this.loadingService.loadingOn();

    // const courses$ = this.coursesService.loadAllCourses()
    //   .pipe(
    //     map(courses => courses.sort(sortCoursesBySeqNo)),
    //     catchError(err => {
    //       const message = "Couldn't load courses";
    //       this.messagesService.showErrors(message);
    //       console.log(message, err);
    //       return throwError(err);
    //     })
    //     // finalize(() => this.loadingService.loadingOff())
    //   );

    // const loadCourses$ = this.loadingService.showLoaderUntilCompleted<Course[]>(courses$);

    // this.beginnerCourses$ = loadCourses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category === "BEGINNER"))
    //   );

    // this.advancedCourses$ = loadCourses$
    //   .pipe(
    //     map(courses => courses.filter(course => course.category === "ADVANCED"))
    //   );

    this.beginnerCourses$ = this.coursesStore.fillterByCategory("BEGINNER");

    this.advancedCourses$ = this.coursesStore.fillterByCategory("ADVANCED");
  }
}




