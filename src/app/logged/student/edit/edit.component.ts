import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  errors;
  student;

  constructor(private studentComponent: StudentComponent, private route: ActivatedRoute) {
    console.log('construtor edit');
    // this.studentComponent.createForm();
  }

  ngOnInit() {
    console.log('init edit')
    const _this = this;
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'));
    });
    console.log(this.route.snapshot.params);
    _this.studentComponent.get(_this.route.snapshot.params['id'], function(student) {
      if (student.status) return;
      _this.student = student;
      console.log(_this.student);
    });
  }

  onSubmit() {
    this.studentComponent.update(this.studentComponent.form.value);
    this.studentComponent._router.navigate(['/admin']);
  }
}
