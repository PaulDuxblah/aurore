import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { PersonAddComponent } from './add/add.component';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  router: String;
  students = [];
  form: FormGroup;

  constructor(public _router: Router, private personService: PersonService, private fb: FormBuilder) {
    this.router = this._router.url;
  }

  getAll(callback) {
    this.personService.getAll(function(persons) {
      callback(persons);
    });
  }

  get(id, callback) {
    this.personService.get(id, function(student) {
      callback(student);
    });
  }

  add(data) {
    this.personService.add(this.getPerson(data), function (result) {
      console.log(result);
    });
  }

  update(data) {
    this.personService.update(data._id, this.formatStudent(data), function (result) {
      console.log(result);
    });
  }

  getFormattedDay(day) {
    return day > 9 ? day : '0' + day;
  }

  getFormattedMonth(month) {
    return month > 9 ? month : '0' + month;
  }

  getFrenchFormattedDate(date) {
    return this.getFormattedDay(date.getDay()) + '/' + this.getFormattedMonth(date.getMonth()) + '/' + date.getFullYear();
  }

  getFrenchFormattedBirthDate(student) {
    return this.getFrenchFormattedDate(new Date(student.person.birthDate));
  }

  getDbFormattedDate(date) {
    return date.toISOString();
  }

  getInputFormattedDate(date) {
    return date.getFullYear() + '-' + this.getFormattedMonth(date.getMonth()) + '-' + this.getFormattedDay(date.getDay());
  }

  getInputFormattedBirthDate(student) {
    return this.getInputFormattedDate(new Date(student.person.birthDate));
  }

  getInputFormattedInscriptionDate(student) {
    return this.getInputFormattedDate(new Date(student.inscriptionDate));
  }

  getDbFormattedBirthDate(student) {
    return this.getDbFormattedDate(new Date(student.birthDate));
  }

  getDbFormattedInscriptionDate(student) {
    return this.getDbFormattedDate(new Date(student.inscriptionDate));
  }

  formatStudent(data) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: this.getDbFormattedBirthDate(data),
      email: data.email,
      phone: data.phone,
      phone2: data.phone2,
      phone3: data.phone3,
      address: {
        road: data.road,
        complement: data.complement,
        city: data.city,
        zipcode: data.zipcode,
      }
    };
  }

  createForm() {
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
    });
  }

  getPerson(data) {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      email: data.email,
      phone: data.phone,
      phone2: data.phone2,
      phone3: data.phone3,
      address: {
        road: data.road,
        complement: data.complement,
        city: data.city,
        zipcode: data.zipcode,
      }
    };
  }

  ngOnInit() {
  }

}
