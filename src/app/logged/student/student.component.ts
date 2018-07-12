import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { AddComponent } from './add/add.component';
import { AllComponent } from './all/all.component';
import { EditComponent } from './edit/edit.component';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  router: String;
  students = [];
  form: FormGroup;
  params;

  constructor(public _router: Router, private studentService: StudentService, private fb: FormBuilder, private route: ActivatedRoute,) {
    this.router = this._router.url;
  }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

  showAdd() {
    this._router.navigate(['add'], { relativeTo: this.route });
  }

  showEdit(id) {
    this._router.navigate(['edit/' + id], { relativeTo: this.route });
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

  createForm(data = {}) {
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
  