import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'student-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('form');
    this.createForm();
  }

  createForm(data = {}) {
    console.log('createForm');
    this.form = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      birthDate: [],
      email: [],
      phone: [],
      phone2: [],
      phone3: [],
      road: ['', Validators.required ],
      complement: [],
      city: ['', Validators.required ],
      zipcode: ['', Validators.required ],
      inscriptionDate: [],
      reduction: [0],
      imageAuthorization: [],
      father: [],
      mother: [],
      legalResponsible: [],
      personToWarn: [],
    });
  }

  ngOnInit() {
  }

}
