import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Person from '../../../models/Person';
import { AdminService } from './admin.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  uri = 'http://localhost:4000/persons/';

  constructor(private http: HttpClient, private adminservice: AdminService) { }

  doCall(uri, type, callback, params = {}) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.adminservice.getToken()
    });

    switch (type) {
      case 'GET':
        this.http.get(uri, { headers }).subscribe((persons) => {
          callback(persons);
        }, (error) => {
          callback(error);
        });
        break;
      case 'POST':
        console.log('POST');
        this.http.post(uri, params, { headers }).subscribe((person) => {
          console.log(person);
          callback(person);
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
}