/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntimacoesComponent } from './intimacoes.component';

describe('IntimacoesComponent', () => {
  let component: IntimacoesComponent;
  let fixture: ComponentFixture<IntimacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntimacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntimacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
