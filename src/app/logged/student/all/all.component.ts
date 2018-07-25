import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'student-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class StudentAllComponent implements OnInit {
  students = [];

  constructor(private studentService: StudentService) {
    const _this = this;
    this.studentService.getAll(function(students) {
      _this.students = students;
    });
  }

  ngOnInit() {
  }
}
