import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-right-bar',
  templateUrl: './copy-right-bar.component.html',
  styleUrls: ['./copy-right-bar.component.css']
})
export class CopyRightBarComponent implements OnInit {

  today = new Date();
  year = this.today.getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
