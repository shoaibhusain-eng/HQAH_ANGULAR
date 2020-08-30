import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService, AuthService, ApiService, ConstantService } from '../../core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  dialCodes = [];

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.dialCodes = h
  }

  register() { }

}
