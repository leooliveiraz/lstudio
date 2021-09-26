import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = null;
  logado = false;
  @Output() login = new EventEmitter();

  constructor(private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    let stringuser = localStorage.getItem('usuario')
    if(stringuser){
      this.usuario = JSON.parse(stringuser);
      this.logado = true;
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.usuario = res;
      this.logado = true;
      localStorage.setItem('usuario',JSON.stringify(res));
      this.login.emit(res);
    });
  }

}
