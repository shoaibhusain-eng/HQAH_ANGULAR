import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';

import { HelperService, AuthGuard, AuthService, ApiService, ConstantService } from 'app/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-tmp',
  templateUrl: './edit-tmp.component.html',
  styleUrls: ['./edit-tmp.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditTmpComponent implements OnInit {

  previewData;
  ckeditorContent: string = '<p>Some html</p>';
  config: any;
  // ckeditorContent: string = '';
  // config = {
  //   uiColor: '#037db8',
  //   allowedContent: true,
  //   resize_enabled: false,
  //   height: 300, // Setting height
  //   forcePasteAsPlainText: true,
  //   font_names: 'Arial;Times New Roman;Verdana',
  // };

  ckeditor;

  html_content = '';

  saveBtn = false;
  saveBtnVal = false;
  primaryDataSource;
  dataSourceList: any = [];
  newDataSourceList: any = [];
  addCommID;

  reinstantBtn = false;
  deleteBtn = true;
  delBtn = true;

  status;
  primaryDataSourceTitle;
  copyLayout: any;
  templateName;
  copySaveBtn = false;
  priDataSource = false;
  commTempNotes: any = '';


  pageType: string;
  templateForm: FormGroup;

  teams = [];
  // userId = '';
  // userName = '';
  tmpId = '';
  showEditor = true;

  constructor(
    private _formBuilder: FormBuilder,
    private helperSvc: HelperService,
    private route: ActivatedRoute,
    private apiSvc: ApiService,
    private constantSvc: ConstantService,
    private sanitized: DomSanitizer
  ) {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      console.log(paramMap)
      this.tmpId = paramMap.get('id');
    });

    this.config = {
      uiColor: '#037db8',
      allowedContent: true,
      resize_enabled: false,
      height: 300, // Setting height
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.getTemplateInfo();
  }

  initForm() {
    this.templateForm = this._formBuilder.group({
      basicDetail: this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
      tmpDetail: this._formBuilder.group({
        html_content: ['', Validators.required],
      })
    });

  }

  getTemplateInfo() {
    this.apiSvc.getService(this.constantSvc.APIConfig.TEMPLATE_GETONE, '?id=' + this.tmpId).subscribe(
      res => {
        console.log(res);
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.setValue(res.data);
          this.previewData = res.data.html_content;
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when get template', err)
    );
  }

  setValue(values) {
    this.templateForm.get('basicDetail').patchValue({
      title: values.title,
      description: values.description,
    });
    this.templateForm.get('tmpDetail').patchValue({
      html_content: values.html_content
    });
    this.ckeditorContent = values.html_content;
  }

  tmpDetailSubmit(formGroup) {
    if (this.templateForm.get(formGroup).invalid) {
      return;
    }
    const formData = this.templateForm.get(formGroup).value;
    formData['id'] = this.tmpId;
    console.log(formData);
    this.apiSvc.putService(this.constantSvc.APIConfig.TEMPLATE_UPDATE, formData).subscribe(
      res => {
        console.log(res);
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.helperSvc.notifySuccess('Information updated successfully');
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when update template', err)
    );
  }

  onTabClick(event) {
    console.log(event);
    // this.showEditor = true;
    console.log(event.tab.textLabel)
    if (event.tab.textLabel === 'Layouts') {
      this.showEditor = true;
    } else {
      this.showEditor = false;
    }


    if (event.tab.textLabel === 'Preview') {
      this.getTemplateInfo();
    }

  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}
