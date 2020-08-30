import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTmpComponent } from './list-tmp.component';

describe('ListTmpComponent', () => {
  let component: ListTmpComponent;
  let fixture: ComponentFixture<ListTmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
