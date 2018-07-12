import { Component, OnInit } from '@angular/core';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errors;

  constructor(private studentComponent: StudentComponent) {
    console.log('add');
    this.studentComponent.createForm();
  }

  onSubmit() {
    this.studentComponent.add(this.studentComponent.form.value);
    this.studentComponent._router.navigate(['/admin']);
  }

  ngOnInit() {
  }
}
