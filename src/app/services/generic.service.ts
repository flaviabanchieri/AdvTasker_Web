import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { map, Observable } from 'rxjs';
import { Helpers } from '../helpers/helpers';


@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  get(caminho: any, filtro: any): Observable<T> {
    return this.http.get<T>(this.apiUrl + `${caminho}` + this.prepararParametros(filtro),
        { headers: Helpers.getHttpHeaders() })
        .pipe(map(res => res));
}

private prepararParametros(filtro: any): string {
  let params = '?';

  if (filtro) {
      const paramsList = Object.keys(filtro)
          .map((param) => this.retornarParametrosComArray(param.toString(), filtro[param]))
          .join('&');

      params = params + paramsList;
  }

  return params;
}

private retornarParametrosComArray(nome: string, campo: any): string {
  let textoArray = '';
  let caracterLigacao = '';
  if (Array.isArray(campo)) {
      campo.forEach(valor => {
          textoArray += caracterLigacao + nome + '=' + valor;
          caracterLigacao = '&';
      });
      return textoArray;
  }
  return nome + '=' + encodeURIComponent(campo);
}

}
