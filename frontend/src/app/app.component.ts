import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  usuario = null;
  logado = false;


  ngOnInit(): void {
    let stringuser = localStorage.getItem('usuario')
    if(stringuser){
      this.usuario = JSON.parse(stringuser);
      this.logado = true;
    }
  }

  realizouLogout(){
    this.usuario = null;
    this.logado = false;
  }

  realizouLogin(){
    let stringuser = localStorage.getItem('usuario')
    if(stringuser){
      this.usuario = JSON.parse(stringuser);
      this.logado = true;
    }
  }


}
