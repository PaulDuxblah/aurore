import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Person from '../../../models/Person';
import { AdminService } from './admin.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  uri = 'http://localhost:4000/person/';

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
    }
  }

  add(data, callback) {
    this.doCall(this.uri, 'POST', callback, data);
  }
}