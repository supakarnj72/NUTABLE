import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CourseYearViewModel } from '../../models/course-entry.model';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'course-entry',
  templateUrl: './course-entry.component.html',
  styleUrls: ['./course-entry.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ModalModule
  ],
  providers: [BsModalService]
})
export class CourseEntryComponent implements OnInit {

  public modalRef!: BsModalRef;

  public courseYear!: string | null;
  public courseData: CourseYearViewModel[] = [
    {
      yearCourse: 1,
      data: [
        {
          courseCode: 'TEST0001',
          courseName: 'วิชา 1',
          courseNameEN: 'Subject 1',
          creditUnits: 22
        }
      ]
    }
  ]

  @ViewChild('course') course!: TemplateRef<any>;

  constructor(private route: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.courseYear = this.route.snapshot.paramMap.get('courseYear');


  }

  public onClickAddSubject(): void {
    this.modalRef = this.modalService.show(this.course);
  }

  public onClickEditCourse(): void {

  }

  public onClickConfirm(): void {

  }

}
