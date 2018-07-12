import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Admin from '../../../models/Admin';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  uri = 'http://localhost:4000/admins/';

  constructor(private http: HttpClient) { }

  getAll(callback) {
    this.http.get(this.uri).subscribe((admins) => {
      callback(admins);
    });
  }

  get(id, callback) {
    this.http.get(this.uri + id).subscribe((admin) => {
      callback(admin);
    });
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('admin', JSON.stringify(authResult.admin));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  register(data, callback) {
    this.http.post(this.uri + 'add', data).subscribe((authResult) => {
      this.setSession(authResult);
      callback(authResult);
    }, (error) => {
      callback(error);
    });
  }

  login(email, password, callback) {
    this.http.post(this.uri + 'login', {
      email: email,
      password: password
    }).subscribe((authResult) => {
      this.setSession(authResult);
      callback(authResult);
    }, (error) => {
      callback(error);
    });
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
