import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiesPagesComponent } from './servies-pages.component';

describe('ServiesPagesComponent', () => {
  let component: ServiesPagesComponent;
  let fixture: ComponentFixture<ServiesPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiesPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
