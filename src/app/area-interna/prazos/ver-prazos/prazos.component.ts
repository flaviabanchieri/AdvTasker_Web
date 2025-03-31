import { Component, model, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-prazos',
  templateUrl: './prazos.component.html',
  styleUrls: ['./prazos.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideNativeDateAdapter(),
  ],
  imports: [MatCardModule, MatDatepickerModule]
})
export class PrazosComponent implements OnInit {
  selected = model<Date | null>(null);

  constructor() { }

  ngOnInit() {
    this.selected.set(new Date());
  }
}
