import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    switch (type) {
      case 'GET':
        this.http.get(uri).subscribe((students) => {
          callback(students);
        }, (error) => {
          callback(error);
        });
        break;
      case 'POST':
        this.http.post(uri, params).subscribe((student) => {
          callback(student);
        }, (error) => {
          callback(error);
        });
        break;
    }
  }

  getAll(callback) {
    this.http.get(this.uri).subscribe((students) => {
      callback(students);
    });
  }

  get(id, callback) {
    this.http.get(this.uri + id).subscribe((student) => {
      callback(student);
    });
  }

  add(data, callback) {
    this.http.post(this.uri, data).subscribe((student) => {
      callback(student);
    }, (error) => {
      callback(error);
    });
  }
}
