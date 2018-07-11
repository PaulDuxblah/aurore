import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
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
        if (typeof data.error === 'object' && data.error.type === 'error') {
          _this.error = 'Le serveur ne répond pas';
        } else {
          _this.error = data.error;
        }

        return;
      }

      _this.router.navigate(['/admin']);
    });
  }
}
