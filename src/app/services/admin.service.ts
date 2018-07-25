import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  endpoint = 'admins/';

  constructor(private api: ApiService) {}

  login(email, password, callback) {
    const _this = this;
    this.api.add(
      this.endpoint + 'login', 
      {
        email: email,
        password: password
      }, 
      function (authResult) {
        _this.setSession(authResult);
        callback(authResult);
      }
    );
  }

  getAll(callback) {
    this.api.get(this.endpoint, function (admins) {
      callback(admins);
    });
  }

  get(id, callback) {
    this.api.get(this.endpoint + id, function (admin) {
      callback(admin);
    });
  }

  // add(data, callback) {
  //   this.http.post(this.uri + 'add', data).subscribe((authResult) => {
  //     this.setSession(authResult);
  //     callback(authResult);
  //   }, (error) => {
  //     callback(error);
  //   });
  // }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('admin', JSON.stringify(authResult.admin));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getExpiration() {
    return moment(JSON.parse(localStorage.getItem("expires_at")));
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('admin');
    localStorage.removeItem('expires_at');
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem('admin'));
  }
}
