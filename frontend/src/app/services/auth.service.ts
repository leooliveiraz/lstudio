import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router) { }

  guardarAutenticacao(googleUser: any) {
    localStorage.setItem('usuario', JSON.stringify(googleUser));
  }

  getUsuario() {
    const usuarioJSON: any = localStorage.getItem('usuario');
    return JSON.parse(usuarioJSON);
  }
  estaLogado() {
    return localStorage.getItem('usuario') == null ? false : true;
  }

}
