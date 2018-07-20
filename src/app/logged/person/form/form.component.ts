import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonComponent } from '../person.component';

@Component({
  selector: 'person-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class PersonFormComponent implements OnInit {
  form: FormGroup;
  @Input() person: object;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private personComponent: PersonComponent) {}

  ngOnInit() {
    this.createForm();
  }

  createForm(data = {}) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [],
      email: [],
      phone: [],
      phone2: [],
      phone3: [],
      road: ['', Validators.required],
      complement: [],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

    runOnSubmit(): void {
      console.log(this.form.value);
    this.onSubmit.emit(this.form.value);
  }
}
