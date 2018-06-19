import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  admin;
  token;

  constructor(private adminservice: AdminService, private router: Router) {
    if (this.adminservice.isLoggedOut()) {
      this.router.navigate(['/']);
    }

    this.admin = this.getAdmin();
    this.token = this.getToken();
  }

  logout() {
    this.adminservice.logout();
    this.router.navigate(['/']);
  }

  getAdmin() {
    return this.adminservice.getAdmin();
  }

  getToken() {
    return this.adminservice.getToken();
  }

  ngOnInit() {
  }
}
