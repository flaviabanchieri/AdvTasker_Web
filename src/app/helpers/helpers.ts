import { HttpHeaders } from "@angular/common/http";

export class Helpers {
  static getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + localStorage.getItem("token"));
  }
}
