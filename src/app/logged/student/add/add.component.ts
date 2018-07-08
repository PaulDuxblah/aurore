import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  add: FormGroup;
  errors;

  constructor(private studentservice: StudentService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.add = this.fb.group({
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
      reduction: [],
      imageAuthorization: [],
      father: [],
      mother: [],
      legalResponsible: [],
      personToWarn: [],
    });
  }

  onSubmit() {
    this.studentservice.add({
      person: {
        firstName: this.add.value.firstName,
        lastName: this.add.value.lastName,
        birthDate: this.add.value.birthDate,
        email: this.add.value.email,
        phone: this.add.value.phone,
        phone2: this.add.value.phone2,
        phone3: this.add.value.phone3,
        address: {
          road: this.add.value.road,
          complement: this.add.value.complement,
          city: this.add.value.city,
          zipcode: this.add.value.zipcode,
        }
      },
      inscriptionDate: this.add.value.inscriptionDate,
      reduction: this.add.value.reduction,
      imageAuthorization: this.add.value.imageAuthorization,
      father: this.add.value.father,
      mother: this.add.value.mother,
      legalReponsible: this.add.value.legalReponsible,
      personToWarn: this.add.value.personToWarn,
    }, function (result) {
      console.log(result);
    });
  }

}
