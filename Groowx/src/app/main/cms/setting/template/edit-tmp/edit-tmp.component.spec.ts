import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTmpComponent } from './edit-tmp.component';

describe('EditTmpComponent', () => {
  let component: EditTmpComponent;
  let fixture: ComponentFixture<EditTmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
