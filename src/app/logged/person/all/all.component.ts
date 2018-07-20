import { Component, OnInit } from '@angular/core';
import { PersonComponent } from '../person.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class PersonAllComponent implements OnInit {
  persons = [];

  constructor(private personComponent: PersonComponent) {
    const _this = this;
    this.personComponent.getAll(function(persons) {
      _this.persons = persons;
    });
  }

  ngOnInit() {
  }

}
