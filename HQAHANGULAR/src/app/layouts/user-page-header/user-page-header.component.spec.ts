import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageHeaderComponent } from './user-page-header.component';

describe('UserPageHeaderComponent', () => {
  let component: UserPageHeaderComponent;
  let fixture: ComponentFixture<UserPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
