/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FootterComponent } from './footter.component';

describe('FootterComponent', () => {
  let component: FootterComponent;
  let fixture: ComponentFixture<FootterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
