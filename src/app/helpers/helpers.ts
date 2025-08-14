import { HttpHeaders } from "@angular/common/http";

export class Helpers {
  static getHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  static getHttpHeadersSemToken(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }static toJson(model: any): any {
    var json = JSON.stringify(model, this.removeNullValues);
    return json;

  }

  private static removeNullValues(key: any, value: any) {
    if (value !== null) {
      return value;
    }
  }
}
