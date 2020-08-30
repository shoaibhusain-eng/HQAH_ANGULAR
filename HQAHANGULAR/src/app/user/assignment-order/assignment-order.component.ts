import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-assignment-order',
  templateUrl: './assignment-order.component.html',
  styleUrls: ['./assignment-order.component.css']
})
export class AssignmentOrderComponent implements OnInit {

  hidebanner = true; 
  constructor() { }

  ngOnInit(): void {
  }


  hideBanner() {
    $('#hideBanner').css('display', 'none');
  }

}
