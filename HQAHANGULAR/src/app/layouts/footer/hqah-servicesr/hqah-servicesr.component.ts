import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-hqah-servicesr',
  templateUrl: './hqah-servicesr.component.html',
  styleUrls: ['./hqah-servicesr.component.css']
})
export class HqahServicesrComponent implements OnInit {

  Australia = <any> [];
  Malasiya = <any> [];
  USA = <any> [];

  constructor(private helpr: HelperService) { }

  ngOnInit() {
    this.Australia = this.helpr.australiaStateList();
    this.Malasiya = this.helpr.malasiyaStateList();
    this.USA = this.helpr.USAStateList();
  }

}
