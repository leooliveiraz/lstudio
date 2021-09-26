import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  @Input() logado = false;
  @Input() usuario = null;
  @Output() logouted = new EventEmitter()
  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.logado = false;
    this.socialAuthService.signOut().then(res => { })
    this.logouted.emit('{logout:true}');
  }

}
