import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'student-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  @Input() student: object;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private studentComponent: StudentComponent) {}

  ngOnInit() {
    this.createForm();
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

    if (this.student) {
      console.log(this.studentComponent.getInputFormattedBirthDate(this.student));
      this.form.controls['firstName'].setValue(this.student.person.firstName);
      this.form.controls['lastName'].setValue(this.student.person.lastName);
      this.form.controls['birthDate'].setValue(this.studentComponent.getInputFormattedBirthDate(this.student));
      this.form.controls['email'].setValue(this.student.person.email);
      this.form.controls['phone'].setValue(this.student.person.phone);
      this.form.controls['phone2'].setValue(this.student.person.phone2);
      this.form.controls['phone3'].setValue(this.student.person.phone3);
      this.form.controls['road'].setValue(this.student.person.address.road);
      this.form.controls['complement'].setValue(this.student.person.address.complement);
      this.form.controls['city'].setValue(this.student.person.address.city);
      this.form.controls['zipcode'].setValue(this.student.person.address.zipcode);
      this.form.controls['inscriptionDate'].setValue(this.studentComponent.getInputFormattedInscriptionDate(this.student));
      this.form.controls['reduction'].setValue(this.student.reduction);
      this.form.controls['imageAuthorization'].setValue(this.student.imageAuthorization);
      this.form.controls['father'].setValue(this.student.father);
      this.form.controls['mother'].setValue(this.student.mother);
      this.form.controls['legalResponsible'].setValue(this.student.legalResponsible);
      this.form.controls['personToWarn'].setValue(this.student.personToWarn);
    }
  }

  runOnSubmit(): void {
    console.log(this.form.value);
    this.onSubmit.emit(this.form.value);
  }
}
