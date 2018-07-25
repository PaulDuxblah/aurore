import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  router: String;
  students = [];

  constructor(public _router: Router) {
    this.router = this._router.url;
  }

  ngOnInit() {}

  formatStudent(data) {
    return {
      person: {
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
      },
      inscriptionDate: this.getDbFormattedInscriptionDate(data),
      reduction: data.reduction,
      imageAuthorization: data.imageAuthorization,
      father: data.father,
      mother: data.mother,
      legalReponsible: data.legalReponsible,
      personToWarn: data.personToWarn,
    };
  }

  getFormattedDay(day) {
    return (day > 9 ? day : '0' + day.toString()).toString();
  }

  getFormattedMonth(month) {
    return ((month + 1) > 9 ? month + 1 : '0' + (month + 1).toString()).toString();
  }

  getFrenchFormattedDate(date) {
    return this.getFormattedDay(date.getDate()) + '/' + this.getFormattedMonth(date.getMonth()) + '/' + date.getFullYear();
  }

  getFrenchFormattedBirthDate(student) {
    return this.getFrenchFormattedDate(new Date(student.person.birthDate));
  }

  getDbFormattedDate(date) {
    return date.toISOString();
  }

  getInputFormattedDate(date) {
    return date.getFullYear() + '-' + this.getFormattedMonth(date.getMonth()) + '-' + this.getFormattedDay(date.getDate());
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
}
  