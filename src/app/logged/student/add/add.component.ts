import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errors;

  constructor(private studentComponent: StudentComponent) {}

  onSubmit(data) {
    this.studentComponent.add(data);
    this.studentComponent._router.navigate(['/admin/students']);
  }

  ngOnInit() {
  }
}
