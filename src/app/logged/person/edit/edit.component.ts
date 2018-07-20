import { Component, OnInit } from '@angular/core';
import { PersonComponent } from '../person.component';
import { PersonFormComponent } from '../form/form.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'person-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PersonEditComponent implements OnInit {
  errors;
  person;

  constructor(private personComponent: PersonComponent, private route: ActivatedRoute) {}

  ngOnInit() {
    const _this = this;
    this.personComponent.get(this.route.snapshot.params['id'], function(person) {
      if (person.status) _this.personComponent._router.navigate(['/admin']);
      console.log(person);
      _this.person = person;
    });
  }

  onSubmit(data) {
    data['_id'] = this.person._id;
    this.personComponent.update(data);
    this.personComponent._router.navigate(['/admin/persons']);
  }
}
