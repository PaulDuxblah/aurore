import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  router: String;
  students = [];

  constructor(public _router: Router, private studentService: StudentService) {
    this.router = this._router.url;
  }

  ngOnInit() {}

  add(data) {
    this.studentService.add(this.formatStudent(data), function (result) {
      console.log(result);
    });
  }

  update(data) {
    this.studentService.update(data._id, this.formatStudent(data), function (result) {
      console.log(result);
    });
  }

  getAll(callback) {
    this.studentService.getAll(function(students) {
      callback(students);
    });
  }

  get(id, callback) {
    this.studentService.get(id, function(student) {
      callback(student);
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
}
  