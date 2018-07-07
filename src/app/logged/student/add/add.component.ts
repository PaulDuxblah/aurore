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
      email: [''],
      phone: [''],
      road: [''],
      complement: [''],
      city: [''],
      zipcode: [''],
    });
  }

  onSubmit() {
    this.studentservice.add({
      firstName: this.add.value.firstName,
      lastName: this.add.value.lastName,
      email: this.add.value.email,
      phone: this.add.value.phone,
      address: {
        road: this.add.value.road,
        complement: this.add.value.complement,
        city: this.add.value.city,
        zipcode: this.add.value.zipcode,
      },
    }, function (result) {
      console.log(result);
    });
  }

}
