import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  servicos = [{id:1, nome:'Desenvolvimento de App', preco:1500.99},
              {id:2, nome:'Desenvolvimento de Sites', preco:400.99},
              {id:3, nome:'Desenvolvimento de Sistemas', preco:1000.99}];
  colunas = ['id','nome','preco'];
  edicao = false;
  formulario ;

  constructor(
    private formBuilder: FormBuilder) {
      this.formulario = this.formBuilder.group({
        id: [],
        nome: ['', [Validators.required] ],
        preco: ['', [Validators.required] ]
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
