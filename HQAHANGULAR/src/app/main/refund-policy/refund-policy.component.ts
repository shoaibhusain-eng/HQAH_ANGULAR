import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.css']
})
export class RefundPolicyComponent implements OnInit {

  patientCategories = [
    { id: 1, name: '+61', description: 'description 1' },
    { id: 2, name: '+1', description: 'US' },
    { id: 3, name: '+91', description: 'india' },
    { id: 4, name: '+44', description: 'Uk' },
    { id: 5, name: '+91', description: 'UAE' },
    { id: 6, name: '+1', description: 'canada' },
    { id: 7, name: '+60', description: 'malaysia' },
    { id: 8, name: '+97', description: 'UAE' }
  ]

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register(){}

}

