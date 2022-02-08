import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerIntl, MatDatepickerModule } from '@matheo/datepicker';
import { MatLuxonDateModule } from '@matheo/datepicker/luxon'
import {MatChipsModule} from '@angular/material/chips';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LoginComponent } from './login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { InicialComponent } from './inicial/inicial.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ServicoComponent } from './servico/servico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token-interceptor.service';
import { Decimal2Directive } from './diretiva/decimal2.directive';
import { environment } from 'src/environments/environment';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt');
import { PtDatetimeIntl } from './services/pt-datetime.intl';
import { AnaliseComponent } from './analise/analise.component';
import { ServiceWorkerModule } from '@angular/service-worker';

export const MY_FORMATS= {
  parse: {
		datetime: 'DD-MM-YYYY HH:mm',
		date: 'DD-MM-YYYY',
		time: 'HH:mm'
	},
	display: {
		datetime: 'DD/MM/YYYY HH:mm',
		date: 'DD/MM/YYYY',
		time: 'HH:mm',
		monthDayLabel: 'DD/MM',
		monthDayA11yLabel: 'DD/MM/YYYY',
		monthYearLabel: 'MMMM',
		monthYearA11yLabel: 'DD/MM/YYYY',
		dateA11yLabel: 'DD/MM/YYYY',
		timeLabel: 'HH:mm',
	},
};

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    LoginComponent,
    InicialComponent,
    AgendamentoComponent,
    ServicoComponent,
    Decimal2Directive,
    AnaliseComponent
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
    // {
      // provide: MAT_DATE_FORMATS,
      // useValue: {MY_FORMATS}
    // },
    { provide: MatDatepickerIntl, useClass: PtDatetimeIntl },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.gProvider
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
