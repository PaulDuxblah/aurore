import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { AddComponent } from './add/add.component';
import { AllComponent } from './all/all.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  router: string;
  students = [];

  constructor(private _router: Router, private studentservice: StudentService) {
    this.router = _router.url;
  }

  ngOnInit() {
  }

}
  