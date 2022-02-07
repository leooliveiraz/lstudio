import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { AgendamentoService } from './../services/agendamento.service';

@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.css']
})
export class AnaliseComponent implements OnInit {


  agendamentos:any = []
  filtrados = []
  dataInicial:any = new Date();
  dataFinal:any = new Date();

  colunas = ['id','cliente','dataAgendamento','servico','valorServico','desconto','valorTotal','formaPagamento','confirmado','pago'];
  colunasTipo = ['tipo','valorTotal'];
  colunasServico = ['servico','valorTotal'];
  formulario: FormGroup ;
  qtdAgendamentos: number = 0;
  qtdConfirmados: number = 0;
  qtdCancelados: number = 0;
  qtdFoi: number = 0;
  qtdFaltas: number = 0;
  valorTotalEstimado: number = 0;
  descontoTotal: number = 0;
  valorPagoTotal: number = 0;
  diferencaTotal: number = 0;
  porTipo: any = [];
  porServico: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentoService) {
      this.dataInicial.setDate(1);
      this.dataInicial.setYear(2020);

      this.formulario = this.formBuilder.group({
        dataInicial: [DateTime.fromISO(this.dataInicial.toISOString()), [Validators.required] ],
        dataFinal: [DateTime.fromISO(this.dataFinal.toISOString()), [Validators.required] ]
      })
    }

  ngOnInit(): void {
    this.agendamentoService.listar().subscribe(res =>{
      this.agendamentos = res;
      this.filtrados = this.agendamentos;
      this.executar();
    })
  }

  executar(){

    if(this.formulario.valid){
      this.dataInicial = this.formulario.controls.dataInicial.value;
      this.dataFinal = this.formulario.controls.dataFinal.value;
      this.dataInicial = this.dataInicial.toJSDate();
      this.dataFinal = this.dataFinal.toJSDate();

      this.dataInicial.setHours(0);
      this.dataInicial.setMinutes(0);
      this.dataInicial.setSeconds(0);
      this.dataFinal.setHours(23);
      this.dataFinal.setMinutes(59);
      this.dataFinal.setSeconds(59);
      this.filtrados = this.agendamentos.filter((a: any) => new Date(a.dataAgendamento) >= this.dataInicial && new Date(a.dataAgendamento) <= this.dataFinal)

      this.qtdAgendamentos = this.filtrados.length;
      this.qtdConfirmados = this.filtrados.filter((a: any) => a.confirmado).length;
      this.qtdCancelados = this.filtrados.filter((a: any) => a.cancelado).length;
      this.qtdFoi = this.filtrados.filter((a: any) => a.foi).length;
      this.qtdFaltas = this.filtrados.filter((a: any) => !a.foi).length;
      this.valorTotalEstimado = this.somarTudo(this.filtrados.filter((a: any) => a.precoTotal).map((mapeado: any) => mapeado.precoTotal ));
      this.descontoTotal = this.somarTudo(this.filtrados.filter((a: any) => a.desconto).map((mapeado: any) => mapeado.desconto ));
      this.valorPagoTotal = this.somarTudo(this.filtrados.filter((a: any) => a.valorPago).map((mapeado: any) => mapeado.valorPago ));
      this.diferencaTotal = this.valorTotalEstimado - this.valorPagoTotal;

      this.porTipo = [];
      this.filtrados.forEach( (f: any) => {
        let indice = this.porTipo.findIndex((obj:any) => obj.formaPagamento === f.formaPagamento);
        if(indice === -1) {
          this.porTipo.push({
            formaPagamento: f.formaPagamento,
            valorPago: f.valorPago ? f.valorPago : 0
          })
        } else {
            this.porTipo[indice].valorPago =
              (f.valorPago ? f.valorPago : 0) + this.porTipo[indice].valorPago
        }
      })

      this.porServico = [];
      this.filtrados.forEach( (f: any) => {
        let indice = this.porServico.findIndex((obj:any) => obj.servico === f.servico);
        if(indice === -1) {
          this.porServico.push({
            servico: f.servico,
            valorPago: f.valorPago ? f.valorPago : 0
          })
        } else {
            this.porServico[indice].valorPago =
              (f.valorPago ? f.valorPago : 0) + this.porServico[indice].valorPago
        }
      })
    }
  }

  somarTudo(listaValores: any[]){
    let total = 0;
    listaValores.forEach( (value: number) => {
      total = total + value;
    });
    return total;
  }
}
