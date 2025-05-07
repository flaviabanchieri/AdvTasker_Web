import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../interfaces/Estado';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosCidadesService {

  constructor(private http: HttpClient) { }

  obterEstadosECidades() : Observable<Estado[]> {
    return this.http.get<{ estados: Estado[] }>('estados-cidades.json')
      .pipe(map(data => data.estados));
  }


  obterEstados() {
    this.http.get<{ estados: Estado[] }>('estados-cidades.json')
      .subscribe((data) => {
        var estados = data.estados;
        return estados.map(e => e.nome);
      });
  }

  obterUF() {
    this.http.get<{ estados: Estado[] }>('estados-cidades.json')
      .subscribe((data) => {
        var estados = data.estados;
        return estados.map(e => e.sigla);
      });
  }

  obterCidadePorUF(uf: string) {
    this.http.get<{ estados: Estado[] }>('estados-cidades.json')
      .subscribe((data) => {
        var estados = data.estados;
        var estadoFiltro = estados.find(e => e.sigla === uf);
        return estadoFiltro?.cidades || [];
      });
  }
}
