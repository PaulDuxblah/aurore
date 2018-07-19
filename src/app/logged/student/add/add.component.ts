import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { StudentFormComponent } from '../form/form.component';

@Component({
  selector: 'student-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class StudentAddComponent implements OnInit {
  errors;

  constructor(private studentComponent: StudentComponent) {}

  onSubmit(data) {
    this.studentComponent.add(data);
    this.studentComponent._router.navigate(['/admin/students']);
  }

  ngOnInit() {
  }
}
