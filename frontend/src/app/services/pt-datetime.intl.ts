import { Injectable } from '@angular/core';
import { MatDatepickerIntl } from '@matheo/datepicker';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PtDatetimeIntl implements MatDatepickerIntl {

  readonly changes = new Subject<void>();
  calendarLabel = 'Calendário';
  openCalendarLabel = 'Abrir';
  closeCalendarLabel: string ='Fechar';
    prevMonthLabel = 'Mês Anterior';
    nextMonthLabel = 'Mês Seguinte';
    prevYearLabel = 'Ano Anterior';
    nextYearLabel = 'Ano Seguinte';
    setToAMLabel = 'Manhã';
    setToPMLabel = 'Tarde';
    switchToMinuteViewLabel = 'Minutos';
    switchToHourViewLabel = 'Horas';
    switchToMonthViewLabel = 'Mês';
    switchToYearViewLabel = 'Ano';
    switchToYearsViewLabel = 'Anos';
    buttonSubmitText = 'Ok';
    buttonSubmitLabel = 'Selecionar';
    buttonCancelText = 'Cancelar';
    buttonCancelLabel = 'Cancelar data';

    prevMultiYearLabel: string ='Últimos Anos';
    nextMultiYearLabel: string = 'Próximos Anos';
    switchToMultiYearViewLabel: string= 'Anos';
    formatYearRange(start: string, end: string): string {
      return `${start} \u2013 ${end}`;
    }
}
