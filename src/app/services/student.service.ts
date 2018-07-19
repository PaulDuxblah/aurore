import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Student from '../../../models/student';
import { AdminService } from './admin.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  uri = 'http://localhost:4000/students/';

  constructor(private http: HttpClient, private adminservice: AdminService) { }

  doCall(uri, type, callback, params = {}) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.adminservice.getToken()
    });

    switch (type) {
      case 'GET':
        this.http.get(uri, { headers }).subscribe((students) => {
          callback(students);
        }, (error) => {
          callback(error);
        });
        break;
      case 'POST':
        this.http.post(uri, params, { headers }).subscribe((student) => {
          callback(student);
        }, (error) => {
          callback(error);
        });
        break;
      case 'PUT':
        this.http.put(uri, params, { headers }).subscribe((student) => {
          callback(student);
        }, (error) => {
          callback(error);
        });
        break;
    }
  }

  getAll(callback) {
    this.doCall(this.uri, 'GET', callback);
  }

  get(id, callback) {
    this.doCall(this.uri + id, 'GET', callback);
  }

  add(data, callback) {
    this.doCall(this.uri, 'POST', callback, data);
  }

  update(id, data, callback) {
    this.doCall(this.uri + id, 'PUT', callback, data);
  }
}
