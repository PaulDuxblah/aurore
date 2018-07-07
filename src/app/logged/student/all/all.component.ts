import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  students = [];

  constructor(private studentservice: StudentService) {
    const _this = this;
    this.studentservice.getAll(function(result) {
      _this.students = result;
    });
  }

  ngOnInit() {
  }

}
