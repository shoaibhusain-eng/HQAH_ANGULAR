import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageFooterComponent } from './user-page-footer.component';

describe('UserPageFooterComponent', () => {
  let component: UserPageFooterComponent;
  let fixture: ComponentFixture<UserPageFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
