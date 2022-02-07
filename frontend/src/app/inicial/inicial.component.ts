import { Component, OnInit } from '@angular/core';
import { AnaliseService } from '../services/analise.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  usuario = null;
  logado = false;

  cliente = 'Nenhum cliente agendado';
  dataHora = null ;
  agendados = 0;
  atendidos = 0;
  cancelados = 0;
  pendentes = 0;
  falta = 0;

  constructor( private analiseService: AnaliseService) { }

  ngOnInit(): void {
    let usuariostring = localStorage.getItem('usuario');
    if(usuariostring){
      this.usuario = JSON.parse(usuariostring);
      this.logado = true;
    }
    this.proximoCliente();
    this.agendamentosHoje();
    this.atendidosHoje();
    this.canceladosHoje();
    this.pendentesHoje();
    this.faltasHoje();

  }

  faltasHoje() {
    this.analiseService.faltouHoje().subscribe((res:any) => {
      this.falta = res;
    })
  }
  pendentesHoje() {
    this.analiseService.confirmacaoPendenteHoje().subscribe((res:any) => {
      this.pendentes = res;
    })
  }
  canceladosHoje() {
    this.analiseService.canceladosHoje().subscribe((res:any) => {
      this.cancelados = res;
    })
  }
  proximoCliente() {
    this.analiseService.proximoCliente().subscribe((res:any) => {
      this.cliente = res.cliente;
      this.dataHora = res.dataAgendamento
    })
  }
  atendidosHoje() {
    this.analiseService.atendidosHoje().subscribe((res:any) => {
      this.atendidos = res;
    })
  }
  agendamentosHoje() {
    this.analiseService.quantidadeHoje().subscribe((res:any) => {
      this.agendados = res;
    })
  }



}
