import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-criar-editar-agenda',
  templateUrl: './criar-editar-agenda.component.html',
  styleUrls: ['./criar-editar-agenda.component.css']
})
export class CriarEditarAgendaComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')); // Obtém o ID da URL e converte para número
    });
  }

}
