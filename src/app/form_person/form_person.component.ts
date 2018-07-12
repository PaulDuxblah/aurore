import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
    selector: 'form_person',
    templateUrl: './form_person.component.html',
    styleUrls: ['./form_person.component.css']
})
export class AuthComponent implements OnInit {
  login: FormGroup;
  error;

  constructor(private adminservice: AdminService, private fb: FormBuilder, private router: Router) {
    if (this.adminservice.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
    this.createForm();
  }

  createForm() {
    this.login = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

  loginAdmin(email, password) {
    const _this = this;
    this.adminservice.login(email, password, function(data) {
      if (data.error) {
        _this.error = data.error;
        return;
      }

      _this.router.navigate(['/admin']);
    });
  }
}
