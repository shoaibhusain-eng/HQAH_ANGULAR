import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyRightBarComponent } from './copy-right-bar.component';

describe('CopyRightBarComponent', () => {
  let component: CopyRightBarComponent;
  let fixture: ComponentFixture<CopyRightBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyRightBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyRightBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
