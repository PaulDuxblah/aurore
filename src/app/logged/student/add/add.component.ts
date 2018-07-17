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

  constructor(private studentComponent: StudentComponent, private formComponent: FormComponent) {}

  onSubmit() {
    this.studentComponent.add(this.formComponent.form.value);
    this.studentComponent._router.navigate(['/admin']);
  }

  ngOnInit() {
  }
}
