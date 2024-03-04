import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal/modal.module';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';

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

  constructor() { }

  ngOnInit() {
  }

}
