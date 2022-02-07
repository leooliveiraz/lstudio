import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnaliseService {

  url = `${environment.url}analise`;
  constructor(private http: HttpClient) { }


  proximoCliente(){
    return this.http.get(`${this.url}/proximo-cliente`);
  }

  quantidadeHoje(){
    return this.http.get(`${this.url}/quantidade-hoje`);
  }

  atendidosHoje(){
    return this.http.get(`${this.url}/atendidos-hoje`);
  }

  canceladosHoje(){
    return this.http.get(`${this.url}/cancelados-hoje`);
  }

  confirmacaoPendenteHoje(){
    return this.http.get(`${this.url}/confirmacao-pendente-hoje`);
  }

  faltouHoje(){
    return this.http.get(`${this.url}/faltou-hoje`);
  }

}
