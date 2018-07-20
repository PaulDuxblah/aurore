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
    this.personComponent.add(this.personComponent.form.value);
    this.personComponent._router.navigate(['/admin']);
  }

  ngOnInit() {
  }

}
