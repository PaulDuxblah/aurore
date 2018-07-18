import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { FormComponent } from '../form/form.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  errors;
  student;

  constructor(private studentComponent: StudentComponent, private formComponent: FormComponent, private route: ActivatedRoute) {
    console.log('construtor edit');
  }

  ngOnInit() {
    const _this = this;
    _this.studentComponent.get(_this.route.snapshot.params['id'], function(student) {
      console.log('callback');
      console.log(student);
      if (student.status) return;
      _this.student = student;
      console.log(_this.student);
    });
  }

  onSubmit() {
    this.studentComponent.update(this.formComponent.form.value);
    this.studentComponent._router.navigate(['/admin']);
  }
}
