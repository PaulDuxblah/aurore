import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uri = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('id_token');
  }

  doCall(uri, type, callback, params = {}) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken()
    });

    switch (type) {
      case 'GET':
        this.http.get(uri, { headers }).subscribe((result) => {
          callback(result);
        }, (error) => {
          callback(error);
        });
        break;
      case 'POST':
        this.http.post(uri, params, { headers }).subscribe((result) => {
          callback(result);
        }, (error) => {
          callback(error);
        });
        break;
      case 'PUT':
        this.http.put(uri, params, { headers }).subscribe((result) => {
          callback(result);
        }, (error) => {
          callback(error);
        });
        break;
    }
  }

  getAll(endpoint, callback) {
    this.doCall(this.uri + endpoint, 'GET', callback);
  }

  get(endpoint, callback) {
    this.doCall(this.uri + endpoint, 'GET', callback);
  }

  add(endpoint, data, callback) {
    this.doCall(this.uri + endpoint, 'POST', callback, data);
  }

  update(endpoint, data, callback) {
    this.doCall(this.uri + endpoint, 'PUT', callback, data);
  }
}
