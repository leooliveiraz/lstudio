import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicoService } from './../services/servico.service';
import { AgendamentoService } from './../services/agendamento.service';
import Swal from 'sweetalert2';
import { DateTime } from 'luxon';




@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {

  agendamentos = [];
  agendamentosFiltrados = [];

  servicos: any = [];

  colunas = ['id','cliente','dataAgendamento','servico','valorTotal','confirmado','pago','acoes'];
  edicao = false;
  formulario ;

  constructor(
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private agendamentoService: AgendamentoService) {
      this.formulario = this.formBuilder.group({
        id: [],
        cliente: ['', [Validators.required] ],
        contato: ['', [Validators.required] ],
        dataAgendamento: ['', [Validators.required] ],
        precoServico: ['00,00', [Validators.required] ],
        desconto: ['00,00', ],
        precoTotal: ['00,00', [Validators.required] ],
        valorPago: ['00,00', [Validators.required] ],
        foiPago: [false, [Validators.required] ],
        confirmado: [false, [Validators.required] ],
        foi: [false, [Validators.required] ],
        idServico: [null, ],
        formaPagamento: ['DINHEIRO', [Validators.required] ],

      })
    }

  ngOnInit(): void {
    this.carregarServicos();
    this.carregarAgendamentos()
  }

  carregarServicos() {
    this.servicoService.listar().subscribe( (res:any) =>{
      this.servicos = res;
    })
  }
  carregarAgendamentos() {
    this.agendamentoService.listar().subscribe( (res:any) =>{
      this.agendamentos = res;
    })
  }

  entrarModoEdicao(){
    this.edicao = true;
  }

  salvar(){

    if(this.formulario.valid){
      let objeto = this.formulario.value;
      objeto.precoServico = parseFloat(`${objeto.precoServico}`.replace(',','.'));
      objeto.desconto = parseFloat(`${objeto.desconto}`.replace(',','.'));
      objeto.precoTotal = parseFloat(`${objeto.precoTotal}`.replace(',','.'));
      objeto.valorPago = parseFloat(`${objeto.valorPago}`.replace(',','.'));
      objeto.dataAgendamento = objeto.dataAgendamento.toJSDate();
      if(!objeto.id){
        this.agendamentoService.salvar(objeto).subscribe(res => {
          this.carregarAgendamentos();
          this.resetarFormulario()
          this.edicao = false;
        })
      } else {
        this.agendamentoService.editar(objeto).subscribe(res => {
          this.carregarAgendamentos();
          this.resetarFormulario()
          this.edicao = false;
        })
      }
    }
  }
  cancelar(){
    this.edicao = false;
    this.resetarFormulario()
  }

  mudouServico(){
    let servico = this.servicos.filter((serv: any) => serv.id == this.formulario.controls.idServico.value)[0]
    this.formulario.controls.precoServico.setValue(`${servico.preco}`.replace('.',','))
  }
  mudouPreco(){
    let precoServico = parseFloat(this.formulario.controls.precoServico.value.replace(',','.'))
    let desconto = parseFloat(this.formulario.controls.desconto.value.replace(',','.'))

    desconto = isNaN(desconto) ? 0 : desconto;
    let valor = precoServico - desconto;

    this.formulario.controls.precoTotal.setValue(isNaN(valor) ? '00,00' : `${precoServico - desconto}`.replace('.',','))
  }

  editar(id:any){
    this.agendamentoService.encontrar(id).subscribe((res:any) =>{
      this.formulario = this.formBuilder.group({
        id: [res.id],
        cliente: [res.cliente, [Validators.required] ],
        contato: [res.contato, [Validators.required] ],
        dataAgendamento: [ DateTime.fromISO(res.dataAgendamento) , [Validators.required] ],
        precoServico: [`${res.precoServico}`.replace('.',','), [Validators.required] ],
        desconto: [res.desconto ? `${res.desconto}`.replace('.',','): '' ],
        precoTotal: [`${res.precoTotal}`.replace('.',','), [Validators.required] ],
        valorPago: [`${res.valorPago}`.replace('.',','), [Validators.required] ],
        foiPago: [res.foiPago, [Validators.required] ],
        confirmado: [res.confirmado, [Validators.required] ],
        foi: [res.foi, [Validators.required] ],
        idServico: [res.idServico, [Validators.required] ],
        formaPagamento: [res.formaPagamento, [Validators.required] ],
      })
      this.entrarModoEdicao();
    })
  }

  excluir(id:any){
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao excluir esse agendamento, ele será permanentemente apagado do banco de dados.',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then( res => {
      if(res){
        if(res.isConfirmed){
          this.agendamentoService.deletar(id).subscribe(res => {
            this.carregarAgendamentos();
          });
        }
      }
    })
  }

  resetarFormulario(){
    this.formulario = this.formBuilder.group({
      id: [],
      cliente: ['', [Validators.required] ],
      contato: ['', [Validators.required] ],
      dataAgendamento: ['', [Validators.required] ],
      precoServico: ['', [Validators.required] ],
      desconto: ['', ],
      precoTotal: ['', [Validators.required] ],
      valorPago: ['00,00', [Validators.required] ],
      foiPago: [false, [Validators.required] ],
      confirmado: [false, [Validators.required] ],
      foi: [false, [Validators.required] ],
      idServico: [false, [Validators.required] ],
      formaPagamento: ['DINHEIRO', [Validators.required] ],

    })
  }




}
