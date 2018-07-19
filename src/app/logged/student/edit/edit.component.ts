import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { StudentFormComponent } from '../form/form.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'student-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class StudentEditComponent implements OnInit {
  errors;
  student;

  constructor(private studentComponent: StudentComponent, private route: ActivatedRoute) {}

  ngOnInit() {
    const _this = this;
    this.studentComponent.get(this.route.snapshot.params['id'], function(student) {
      if (student.status) _this.studentComponent._router.navigate(['/admin']);
      console.log(student);
      _this.student = student;
    });
  }

  onSubmit(data) {
    data['_id'] = this.student._id;
    this.studentComponent.update(data);
    this.studentComponent._router.navigate(['/admin/students']);
  }
}
