import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { SelectBoxViewModel } from '../../models/schedule.model';
@Component({
  selector: 'schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class SchedulePageComponent implements OnInit {

  public courseYear: SelectBoxViewModel[] = [
    {
      text: "ชั้นปีที่ 1",
      value: "1"
    },
    {
      text: "ชั้นปีที่ 2",
      value: "2"
    },
    {
      text: "ชั้นปีที่ 3",
      value: "3"
    },
    {
      text: "ชั้นปีที่ 4",
      value: "4"
    },
    {
      text: "ชั้นปีอื่น ๆ",
      value: "5"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public onClickAddCourseGroup(): void {

  }

}
