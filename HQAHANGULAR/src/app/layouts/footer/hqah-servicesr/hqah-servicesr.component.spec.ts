import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqahServicesrComponent } from './hqah-servicesr.component';

describe('HqahServicesrComponent', () => {
  let component: HqahServicesrComponent;
  let fixture: ComponentFixture<HqahServicesrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqahServicesrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqahServicesrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
