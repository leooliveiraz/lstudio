import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  usuario = null;
  logado = false;

  constructor() { }

  ngOnInit(): void {
    let usuariostring = localStorage.getItem('usuario');
    if(usuariostring){
      this.usuario = JSON.parse(usuariostring);
      this.logado = true;
    }
  }

}
