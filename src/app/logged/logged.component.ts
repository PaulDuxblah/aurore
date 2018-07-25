import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin.model';
import { ApiService } from '../services/api.service';
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

  constructor(private router: Router, private adminService: AdminService, private apiService: ApiService) {
    if (this.adminService.isLoggedOut()) {
      this.router.navigate(['/']);
    }

    this.admin = this.adminService.getAdmin();
    this.token = this.apiService.getToken();
  }

  logout() {
    this.adminService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }
}
