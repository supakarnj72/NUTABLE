export class CourseYearViewModel {
    yearCourse: number = 0;
    data: CourseViewModel[] = [];
}

export class CourseViewModel {
    courseCode: string = '';
    courseName: string = '';
    courseNameEN: string = '';
    creditUnits: number = 0;
}