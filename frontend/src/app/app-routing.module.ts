import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AnaliseComponent } from './analise/analise.component';
import { InicialComponent } from './inicial/inicial.component';
import { LoginComponent } from './login/login.component';
import { ServicoComponent } from './servico/servico.component';

const routes: Routes = [
  { path: '', component: InicialComponent },
  { path: 'inicial', component: InicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'servico', component: ServicoComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'analise', component: AnaliseComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
