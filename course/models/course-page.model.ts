export interface CourseViewModel {
  courseYear: string;
  courseQty: number;
  creditUnits: number;
  edit: string;
  view: string;
  delete: string;
}

export class CoursePageParam {
  courseYear: string;
  constructor() {
    this.courseYear = '';
  }
}

