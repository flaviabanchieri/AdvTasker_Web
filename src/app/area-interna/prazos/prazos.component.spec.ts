/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrazosComponent } from './prazos.component';

describe('PrazosComponent', () => {
  let component: PrazosComponent;
  let fixture: ComponentFixture<PrazosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrazosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
