import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { CoursePageParam, CourseViewModel as CourseViewModel } from '../../models/course-page.model';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

const ELEMENT_DATA: CourseViewModel[] = [
  { courseYear: "2566", courseQty: 120, creditUnits: 120, edit: '', view: '', delete: '' },
  { courseYear: "2565", courseQty: 90, creditUnits: 90, edit: '', view: '', delete: '' },
];

@Component({
  selector: 'course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    ModalModule,
  ],
  providers: [BsModalService]
})

export class CoursePageComponent implements OnInit {

  public isEdit: boolean = false;
  public modalRef!: BsModalRef;
  public param: CoursePageParam = new CoursePageParam();


  @ViewChild('courseYear') courseYear!: TemplateRef<any>;

  displayedColumns: string[] = [
    'courseYear',
    'courseQty',
    'creditUnits',
    'edit',
    'view',
    'delete'
  ];

  dataSource = ELEMENT_DATA;

  constructor(
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit() {
  }

  public onClickAddCourseYear(): void {
    this.isEdit = false;
    this.modalRef = this.modalService.show(this.courseYear);
  }

  public onClickEditCourseYear(cellData: any): void {
    this.isEdit = true;
    this.param.courseYear = cellData.courseYear;
    this.modalRef = this.modalService.show(this.courseYear);
  }

  public onClickViewCourseYear(cellData: any): void {
    this.router.navigate(["course-entry" + "/" + cellData.courseYear]).then(() => { });
  }

  public onClickConfirm(): void {
    this.router.navigate(["course-entry" + "/" + this.param.courseYear]).then(() => {
      this.modalRef.hide();
    });
  }

}
