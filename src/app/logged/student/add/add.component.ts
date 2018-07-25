import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { StudentFormComponent } from '../form/form.component';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'student-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class StudentAddComponent implements OnInit {
  errors;

  constructor(private studentComponent: StudentComponent, private studentService: StudentService) {}

  onSubmit(data) {
    const _this = this;
    this.studentService.add(new Student(this.studentComponent.formatStudent(data)), function(result) {
      _this.studentComponent._router.navigate(['/admin/students']);
    });
  }

  ngOnInit() {
  }
}
