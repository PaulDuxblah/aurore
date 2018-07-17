import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { AddComponent } from './add/add.component';
import { AllComponent } from './all/all.component';
import { EditComponent } from './edit/edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  router: String;
  students = [];
  params;

  constructor(public _router: Router, private studentService: StudentService, private route: ActivatedRoute) {
    this.router = this._router.url;
  }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

  add(data) {
    this.studentService.add(this.getStudent(data), function (result) {
      console.log(result);
    });
  }

  update(data) {
    this.studentService.update(data._id, this.getStudent(data), function (result) {
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

  getStudent(data) {
    return {
      person: {
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
      },
      inscriptionDate: data.inscriptionDate,
      reduction: data.reduction,
      imageAuthorization: data.imageAuthorization,
      father: data.father,
      mother: data.mother,
      legalReponsible: data.legalReponsible,
      personToWarn: data.personToWarn,
    };
  }
}
  