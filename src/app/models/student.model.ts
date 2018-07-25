import { Person } from './person.model';
import { ApiService } from '../services/api.service';

export class Student {
  id: String;
  inscriptionDate: Date;
  imageAuthorization: Boolean;
  reduction: Number;
  person: Person;
  father: Person;
  mother: Person;
  legalResponsible: Person;
  personToWarn: Person;

  constructor(data) {
    this.id = data._id ? data._id : (data.id ? data.id : '');
    this.inscriptionDate = data.inscriptionDate;
    this.imageAuthorization = data.imageAuthorization;
    this.reduction = data.reduction;
    this.person = data.person;
    this.father = data.father;
    this.mother = data.mother;
    this.legalResponsible = data.legalResponsible;
    this.personToWarn = data.personToWarn;
  }
}
