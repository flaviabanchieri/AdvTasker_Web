import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Calendar, CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br'; // Importando o idioma
import { SidebarService } from '../../core/services/sidebar.service';
import { RefObject } from '@fullcalendar/core/preact.js';
import { ApiService } from '../../core/services/generic.service';
import { Agenda } from '../../core/models/agenda/agenda';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  imports: [CommonModule, NgbModule, RouterModule, FullCalendarModule]
})
export class AgendaComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() { 
    this.popularEvento 
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek', // Visualização semanal
    customButtons: {
      myCustomButton: {
        text: '+ Agendar',
        click: () => {
          this.criarEvento();
        }
      }
    },
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin], // Habilita a visualização semanal
    handleWindowResize: true,
    themeSystem: 'bootstrap4',
    height: "85vh",
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,timeGridDay myCustomButton' // Alterna entre visão semanal e diária
    },
    events: [
      { id: "1", title: 'Reunião', start: new Date(), end: new Date(new Date().setHours(new Date().getHours() + 1)) },
      { id: "2", title: 'Trabalho', start: new Date(new Date().setDate(new Date().getDate() + 1)), allDay: true }
    ],
    editable: true, // Permite arrastar eventos
    eventDrop: function (info: any) {
      alert(info.event.title + " was dropped on " + info.event.start.toISOString());
    },
    selectable: true,
    locale: ptBrLocale,
    select: this.handleDateClick.bind(this), // Ação ao clicar em uma data
    eventClick: this.handleEventClick.bind(this) // Ação ao clicar em um evento
  };

  handleDateClick(arg: any) {
    alert('Data clicada: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    this.router.navigate([`/agenda/editar/${arg.event.id}`]);
    console.log(arg.event.id)

  }

  criarEvento() {
    this.router.navigate(['/agenda/editar/0']);
  }

  popularEvento() {
    this.apiService.getItems<Agenda[]>('your-api-endpoint').subscribe((data: Agenda[]) => {
      const eventosFormatados = data.map((evento: Agenda) => ({
        id: evento.id.toString(),
        title: evento.titulo,
        start: evento.dataInicial,
        end: evento.dataFinal,
        description: evento.descricao
      }));

      this.calendarOptions.events = eventosFormatados
    });
  }

}

