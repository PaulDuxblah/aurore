import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  students = [];

  constructor(private studentComponent: StudentComponent) {
    const _this = this;
    this.studentComponent.getAll(function(students) {
      _this.students = students;
    });
  }

  ngOnInit() {
  }
}
