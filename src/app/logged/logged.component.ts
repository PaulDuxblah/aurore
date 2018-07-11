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

  constructor(private adminService: AdminService, private router: Router) {
    if (this.adminService.isLoggedOut()) {
      this.router.navigate(['/']);
    }

    this.admin = this.getAdmin();
    this.token = this.getToken();
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/']);
  }

  getAdmin() {
    return this.adminService.getAdmin();
  }

  getToken() {
    return this.adminService.getToken();
  }

  ngOnInit() {
  }
}
