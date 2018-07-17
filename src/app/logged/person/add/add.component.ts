import { Component, OnInit } from '@angular/core';
import { PersonComponent } from '../person.component';


@Component({
  selector: 'person-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class PersonAddComponent implements OnInit {
  errors;

  constructor(private personComponent: PersonComponent) {
    this.personComponent.createForm();
  }

  onSubmit() {
    //this.studentComponent.add(this.studentComponent.form.value);
    //this.studentComponent._router.navigate(['/admin']);
    //tranquille
  }

  ngOnInit() {
  }

}
