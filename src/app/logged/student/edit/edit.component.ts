import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { StudentFormComponent } from '../form/form.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from '../../../models/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'student-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class StudentEditComponent implements OnInit {
  errors;
  student;

  constructor(private studentComponent: StudentComponent, private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit() {
    const _this = this;
    this.studentService.get(this.route.snapshot.params['id'], function(student) {
      if (student.status) _this.studentComponent._router.navigate(['/admin']);
      _this.student = student;
    });
  }

  onSubmit(data) {
    const _this = this;
    data = this.studentComponent.formatStudent(data);
    data.id = this.student.id;
    this.studentService.update(new Student(data), function(result) {
      _this.studentComponent._router.navigate(['/admin/students']);
    });
  }
}
