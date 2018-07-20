import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  endpoint = 'students/';

  constructor(private api: ApiService) {}

  getAll = (callback) => {
    this.api.getAll(this.endpoint, function(result) {
      let students = Array(result.length);

      result.forEach(function(data, key) {
        students[key] = new Student(data);
      });

      callback(students);
    });
  }

  get = (id, callback) => {
    this.api.get(this.endpoint + id, function(result) {
      callback(new Student(result));
    });
  }

  add = (student, callback) => {
    this.api.add(this.endpoint, student, function(result) {
      callback(new Student(result));
    });
  }

  update = (student, callback) => {
    this.api.update(this.endpoint + student.id, student, function(result) {
      callback(new Student(result));
    });
  }
}
