import { Address } from './address.model';

export class Person {
  id: String;
  firstName:  String;
  lastName: String;
  birthDate: Date;
  email: String;
  phone: String;
  phone2: String;
  phone3: String;
  role: String;
  address: Address;
  // school: School;

  constructor(data) {
    this.id = data._id ? data._id : (data.id ? data.id : '');
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.birthDate = data.birthDate;
    this.phone = data.phone;
    this.phone2 = data.phone2;
    this.phone3 = data.phone3;
    this.role = data.role;
    this.address = data.address;
  }
}
