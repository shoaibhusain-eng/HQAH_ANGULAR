import { Component, OnInit } from '@angular/core';
import { stickyHeaderjQuery } from '../../app.helper';
// import { HelperService, AuthService, ApiService } from '@app/core';

@Component({
  selector: 'app-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.css']
})
export class UserPageHeaderComponent implements OnInit {

  constructor() { 
    // private helperSvc: HelperService
    // private authSvc: AuthService,
    // private apiSvc: ApiService,
  }

  ngOnInit(): void {
    stickyHeaderjQuery();
  }
  logout(){}

}
