import { Component, OnInit } from '@angular/core';
import { HelperService, ConstantService, ApiService } from 'src/app/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Meta, DomSanitizer, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-servies-pages',
  templateUrl: './servies-pages.component.html',
  styleUrls: ['./servies-pages.component.css']
})
export class ServiesPagesComponent implements OnInit {

  wordCount = [];
  subjectList = [];
  serviceID = '';
  serviceContent = {} as any;
  bannerImageSrc: any;

  constructor(
    private route: ActivatedRoute,
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private apiSvc: ApiService,
    private fb: FormBuilder,
    private metaService: Meta,
    private titleService: Title,
    private router: Router,
    private sanitized: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.serviceID = paramMap.get('id');
    });

    this.wordCount = this.helperSvc.pageCount();
    this.subjectList = this.helperSvc.subjects();
    this.getServicePage();
  }

  getServicePage() {
    this.apiSvc.getService(this.constantSvc.APIConfig.GET_ONE_SERVICEPAGE, '?id=' + this.serviceID).subscribe(
      res => {

        if (res.statusCode === 200 && res.statusType === 'success') {
          console.log('oooooooooooo', res);
          this.serviceContent = res.data;
          if (this.serviceContent.banner_image) {
            this.bannerImageSrc = this.constantSvc.APIBaseURL + 'general/' + res.data.banner_image[0];
            this.metaService.addTag({property: this.serviceContent.banner_image_meta_desc, content: this.bannerImageSrc})
          }
          this.titleService.setTitle(this.serviceContent.title);
          this.metaService.addTag({ name: this.serviceContent.meta_data_title, content: this.serviceContent.meta_data_desc });
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('error in add dealership info api ', err)
    );
  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
