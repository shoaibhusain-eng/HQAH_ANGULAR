import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentOrderComponent } from './assignment-order.component';

describe('AssignmentOrderComponent', () => {
  let component: AssignmentOrderComponent;
  let fixture: ComponentFixture<AssignmentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
