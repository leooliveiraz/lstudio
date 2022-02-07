import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  url = `${environment.url}agendamentos`;
  constructor(private http: HttpClient) { }


  listar(){
    return this.http.get(`${this.url}`);
  }

  encontrar(id:any){
    return this.http.get(`${this.url}/${id}`);
  }


  salvar(agendamento: any){
    return this.http.post(`${this.url}`, agendamento);

  }

  editar(agendamento: any){
    return this.http.put(`${this.url}`, agendamento);

  }

  deletar(idAgendamento: any){
    return this.http.delete(`${this.url}/${idAgendamento}`);
  }

}
