import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';

import { HelperService, AuthGuard, AuthService, ApiService, ConstantService } from 'app/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditComponent implements OnInit {

  servicePageData = {} as any;
  ckeditorContent = '<p>Some html</p>';
  config: any;

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
  servicePageForm: FormGroup;

  teams = [];
  // userId = '';
  // userName = '';
  pageId = '';
  showEditor = true;
  templateList = [];
  bannerImageSrc: any;
  filesToUpload = [];

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
      this.pageId = paramMap.get('id');
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
    this.getServicePageInFo();
    this.tmpList();
  }

  initForm() {
    this.servicePageForm = this._formBuilder.group({
      basicDetail: this._formBuilder.group({
        title: ['', Validators.required],
        title_desc: ['', Validators.required],
        sub_title: ['', Validators.required],
        sub_desc: ['', Validators.required],
        meta_data_title: ['', Validators.required],
        meta_data_desc: ['', Validators.required],
        level: ['', Validators.required],
        parent_id: ['', Validators.required]
      }),
      tmpDetail: this._formBuilder.group({
        html: ['', Validators.required],
        html2: [''],
        html3: [''],
        // banner_image: [''],
        banner_image_meta_title: [''],
        banner_image_meta_desc: [''],
      })
    });

  }

  tmpList() {
    this.apiSvc.postService(this.constantSvc.APIConfig.TEMPLATE_LIST, '').subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.templateList = res.data.template;
          console.log('bgbbbbbbbbbbbbbbbbbb');
          console.log(res);
          // this.usersList();
          // this.helperSvc.notifySuccess(res.message);
        } else {
          this.helperSvc.notifyError(res.message);
        }

      }, err => console.log('something went wrong when create Template', err)
    );
  }

  getServicePageInFo() {
    this.apiSvc.getService(this.constantSvc.APIConfig.GET_SERVICEPAGE, '?id=' + this.pageId).subscribe(
      res => {
        console.log(res);
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.setValue(res.data);
          this.servicePageData = res.data;
          console.log('aaaaaaaaaaaaaaaaaaaaaaaa', res.data);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when get template', err)
    );
  }

  setValue(values) {
    this.servicePageForm.get('basicDetail').patchValue({
      title: values.title,
      title_desc: values.title_desc,
      sub_title: values.sub_title,
      sub_desc: values.sub_desc,
      meta_data_title: values.meta_data_title,
      meta_data_desc: values.meta_data_desc,
      level: Number(values.level),
      parent_id: Number(values.parent_id)
    });
    this.servicePageForm.get('tmpDetail').patchValue({
      html: values.html,
      html2: values.html2,
      html3: values.html3,
      banner_image_meta_title: values.banner_image_meta_title,
      banner_image_meta_desc: values.banner_image_meta_desc,
    });
    this.ckeditorContent = values.html_content;
    this.bannerImageSrc = values.banner_image ? (this.constantSvc.APIBaseURL + 'general/' +  values.banner_image[0]) : ''
    console.log(values);
  }

  tmpDetailSubmit(formGroup) {
    if (this.servicePageForm.get(formGroup).invalid) {
      return;
    }
    const formData = this.servicePageForm.get(formGroup).value;
    formData['id'] = this.pageId;

    const jsonData = this.helperSvc.formData(formData);

    if (formGroup === 'tmpDetail') {
      const files = this.filesToUpload;
      for (let i = 0; i < files.length; i++) {
        jsonData.append('banner_image', files[i], files[i].name);
      }
    }

    this.apiSvc.putService(this.constantSvc.APIConfig.UPDATE_SERVICEPAGE, jsonData).subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.helperSvc.notifySuccess('Information updated successfully');
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when update template', err)
    );
  }

  onTabClick(event) {
    if (event.tab.textLabel === 'Layouts') {
      this.showEditor = true;
    } else {
      this.showEditor = false;
    }

    if (event.tab.textLabel === 'Preview') {
      this.getServicePageInFo();
    }

  }

  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  onTmpSelect(event) {
    const tmp = this.templateList.find(x => x._id === event.value)
    this.servicePageForm.get('tmpDetail').patchValue({
      html: tmp.html_content
    });
  }

  bannerImage(event): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.bannerImageSrc = reader.result;

        reader.readAsDataURL(file);
    }
    this.filesToUpload = (event.target.files as Array<File>);
  }

  preview() {
    const url = 'http://localhost:4300/home/service?id=' + (this.servicePageData._id) + '&title=' + (this.servicePageData.title);
    window.open(url, '_blank');
  }

}
