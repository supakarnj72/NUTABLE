import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfessorParam, ProfessorViewModel } from '../../models/professor.model';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

const professorData: ProfessorViewModel[] = [
  {
    professorId: "PF12345",
    prefix: "ดร.",
    firstName: "สมหมาย",
    lastName: "ยิ่งเจริญ",
    faculty: "วิศวกรรมศาสตร์",
    edit: '',
    delete: ''
  }
];

@Component({
  selector: 'professor-page',
  templateUrl: './professor-page.component.html',
  styleUrls: ['./professor-page.component.css'],
  standalone: true,
  imports: [MatCardModule
    , MatIconModule
    , MatButtonModule
    , ModalModule
    , MatTableModule
    , FormsModule
  ],
  providers: [BsModalService]
})
export class ProfessorPageComponent implements OnInit {

  public modalRef!: BsModalRef;

  public isEdit: boolean = false;

  @ViewChild('professor') professor!: TemplateRef<any>;

  public displayedColumns: string[] = [
    'professorId',
    'prefix',
    'firstName',
    'lastName',
    'faculty',
    'edit',
    'delete'
  ];

  public dataSource = professorData;

  public param: ProfessorParam = new ProfessorParam();

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  public onClickAddProfessor(): void {
    this.isEdit = false;
    this.param = new ProfessorParam();
    this.modalRef = this.modalService.show(this.professor);
  }

  public onClickEditProfessor(cellData: any): void {
    this.isEdit = true;
    this.param = { ...cellData };
    this.modalRef = this.modalService.show(this.professor);
  }

  public onClickConfirm(): void {

  }

}
