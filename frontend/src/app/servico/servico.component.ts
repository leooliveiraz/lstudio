import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicoService } from './../services/servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {
  servicos: any = [];

  colunas = ['id','nome','preco','acoes'];

  edicao = false;
  carregandoEdicao = false;

  formulario: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicoService
    ) {
      this.formulario = this.formBuilder.group({
        id: [],
        nome: ['', [Validators.required] ],
        preco: ['', [Validators.required] ]
      })
     }

  ngOnInit(): void {
    this.listar();

  }

  entrarModoEdicao(){
    this.edicao = true;
  }

  editar(id:any){
    this.service.encontrar(id).subscribe((res:any) =>{
      this.formulario = this.formBuilder.group({
        id: [res.id],
        nome: [res.nome, [Validators.required] ],
        preco: [`${res.preco}`.replace('.',','), [Validators.required] ]
      })
      this.entrarModoEdicao();
    })
  }

  salvar(){
    if(this.formulario.valid){
      this.carregandoEdicao = true;

      let objeto = this.formulario.value;
      objeto.preco = parseFloat(objeto.preco.replace(',','.'));

      if(!objeto.id){

        this.service.salvar(objeto).subscribe(res => {
          this.carregandoEdicao = false;
          this.edicao = false;
          this.resetarFormulario();
          this.listar();
        }, error => {
          console.error(error)
          this.carregandoEdicao = false;
        })
      } else {
        this.service.editar(objeto).subscribe(res => {
          this.carregandoEdicao = false;
          this.edicao = false;
          this.resetarFormulario();
          this.listar();
        }, error => {
          console.error(error)
          this.carregandoEdicao = false;
        })
      }

    }
  }

  cancelar(){
    this.resetarFormulario();
    this.edicao = false;
  }

  resetarFormulario(){
    this.formulario = this.formBuilder.group({
      id: [],
      nome: ['', [Validators.required] ],
      preco: ['', [Validators.required] ]
    })
  }

  listar(){
    this.service.listar().subscribe(res => {
      this.servicos = res;
    })
  }

  excluir(id:any){
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Ao excluir esse registro, ele será permanentemente apagado do banco de dados.',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then( res => {
      if(res){
        if(res.isConfirmed){
          this.service.deletar(id).subscribe(res => {
            this.listar();
          });
        }
      }
    })
  }
}
