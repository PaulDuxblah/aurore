export class Address {
  id: String;
  road: String;
  complement: String;
  city: String;
  zipcode: Number;

  constructor(data) {
    this.id = data._id ? data._id : (data.id ? data.id : '');
    this.road = data.road;
    this.complement = data.complement;
    this.city = data.city;
    this.zipcode = data.zipcode;
  }
}
