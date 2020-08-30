import { Component, OnInit, NgZone, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService, ConstantService, ApiService, AuthService } from '../../core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { retryWhen } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-service-nav-bar',
  templateUrl: './service-nav-bar.component.html',
  styleUrls: ['./service-nav-bar.component.css']
})
export class ServiceNavBarComponent implements OnInit {
  serviceTitle = [[], [], [], []];

  constructor(
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private apiSvc: ApiService,
    private fb: FormBuilder,
    private zone: NgZone,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private metaService: Meta

  ) { }

  ngOnInit(): void {
    this.serviceLinks();
  }

  serviceLinks() {
    this.apiSvc.getService(this.constantSvc.APIConfig.GET_SERVICEPAGE, '').subscribe(
      res => {
        console.log('oooooooooooo', res);
        // console.log("total",res.data)
        if (res.statusCode === 200 && res.statusType === 'success') {
          const items = res.data;
          

          const n = 4
          this.serviceTitle = [[], [], [], []];

          const wordsPerLine = Math.ceil(items.length / n);

          let count = -1;
          for (let line = 0; line < n; line++) {
            for (let i = 0; i < wordsPerLine; i++) {
              count++;

              const value = items[i + line * wordsPerLine]
              if (!value) continue;
              if (count < n) {
                this.serviceTitle[count].push(value)
              } else {
                this.serviceTitle[0].push(value)
                count = 0;
              }
            }
          }
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('error in add dealership info api ', err)
    );
  }

  onLinkClick(value) {
    console.log(value);
    this.router.navigate(['/home/service'], { queryParams: { id: value._id, title: value.title } });
  }




}
