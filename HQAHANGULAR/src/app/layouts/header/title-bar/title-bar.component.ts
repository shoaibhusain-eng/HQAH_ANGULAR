import { Component, OnInit } from '@angular/core';
import { stickyHeaderjQuery } from '../../../app.helper';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    stickyHeaderjQuery();
  }

}
