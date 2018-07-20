import { Component, OnInit } from '@angular/core';
import { PersonComponent } from '../person.component';
import { PersonFormComponent } from '../form/form.component';



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

  onSubmit(data) {
    this.personComponent.add(data);
    this.personComponent._router.navigate(['/admin']);
  }

  ngOnInit() {
  }

}
