import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  agendamentos = [{id:1, cliente:'Jaine', dataAgendamento: new Date()},
              {id:2, cliente:'Bruna' , dataAgendamento: new Date()},
              {id:3, cliente:'Carolina' , dataAgendamento: new Date()},
              {id:4, cliente:'Steffany', dataAgendamento: new Date()},
              {id:5, cliente:'Julias' , dataAgendamento: new Date()},
              {id:6, cliente:'Elaie' , dataAgendamento: new Date()},
              {id:7, cliente:'Jessica', dataAgendamento: new Date()},
              {id:8, cliente:'Paula' , dataAgendamento: new Date()},
              {id:9, cliente:'Clara' , dataAgendamento: new Date()},
              {id:10, cliente:'Ana', dataAgendamento: new Date()},
              {id:11, cliente:'Cristina' , dataAgendamento: new Date()},
              {id:12, cliente:'Ketelin' , dataAgendamento: new Date()},
              {id:13, cliente:'Denise', dataAgendamento: new Date()},
              {id:14, cliente:'Fernanda' , dataAgendamento: new Date()},
              {id:15, cliente:'Gabriela' , dataAgendamento: new Date()},
              {id:16, cliente:'Heloisa', dataAgendamento: new Date()},
              {id:17, cliente:'Ingrid' , dataAgendamento: new Date()},
              {id:16, cliente:'Lana' , dataAgendamento: new Date()},];

  servicos = [{id:1, nome:'Desenvolvimento de App', preco:1500.99},
              {id:2, nome:'Desenvolvimento de Sites', preco:400.99},
              {id:3, nome:'Desenvolvimento de Sistemas', preco:1000.99}];

  colunas = ['id','cliente','dataAgendamento','acoes'];
  edicao = false;
  formulario ;

  constructor(
    private formBuilder: FormBuilder) {
      this.formulario = this.formBuilder.group({
        id: [],
        cliente: ['', [Validators.required] ],
        contato: ['', [Validators.required] ],
        dataAgendamento: ['', [Validators.required] ],
        precoServico: ['', [Validators.required] ],
        desconto: ['', ],
        precoTotal: ['', [Validators.required] ],
        valorPago: ['', [Validators.required] ],
        foiPago: [false, [Validators.required] ],
        confirmado: [false, [Validators.required] ],
        foi: [false, [Validators.required] ],
        servico: [false, [Validators.required] ],

      })
    }

  ngOnInit(): void {

  }

  entrarModoEdicao(){
    this.edicao = true;
  }

  salvar(){
    this.edicao = false;
  }
  cancelar(){
    this.edicao = false;
  }

}
