import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  url = `${environment.url}servicos`;
  constructor(private http: HttpClient) { }


  listar(){
    return this.http.get(`${this.url}`);
  }

  encontrar(id:any){
    return this.http.get(`${this.url}/${id}`);
  }


  salvar(servico: any){
    return this.http.post(`${this.url}`, servico);

  }

  editar(servico: any){
    return this.http.put(`${this.url}`, servico);

  }

  deletar(idServico: any){
    return this.http.delete(`${this.url}/${idServico}`);
  }


}
