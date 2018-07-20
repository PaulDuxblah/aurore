import { ApiService } from '../services/api.service';
import { AdminService } from '../services/admin.service';

export class Admin {
  id: String;
  email: String;
  password: String;

  constructor(data, private service: AdminService) {
    this.id = data.id ? data.id : '';
    this.email = data.email;
    this.password = data.password;
  }

  login(email, password, callback) {
    this.service.login(email, password, callback);
  }
}
