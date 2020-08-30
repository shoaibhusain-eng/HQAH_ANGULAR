import { Component, OnInit, NgZone, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService, ConstantService, ApiService, AuthService } from '../core';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;

  @ViewChild('previewBox', { static: true }) previewBox: TemplateRef<any>;

  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey': '6Lege6YZAAAAAP3_YibfEMQUN7RctwwU6f-NEFpX',
      'callback': (response) => {
        console.log(response);
      }
    });
  }

  addRecaptchaScript() {

    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }

    (function (d, s, id, obj) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }

  assignmentForm: FormGroup;
  submitted = false;
  file: File;
  wordCount = [];
  subjectList = [];
  imageIndexOne = 0;
  imageView = [];
  siteKey = "shoaib";

  dialCodes = [];
  selectedCountry = '+91';
  filesToUpload: File[];


  constructor(
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private apiSvc: ApiService,
    private fb: FormBuilder,
    private zone: NgZone,
    private dialog: MatDialog,
    private metaTagService: Meta

  ) { }

  ngOnInit() {

    this.initForm();
    this.dialCodes = this.helperSvc.countryCode();

    this.wordCount = this.helperSvc.pageCount();
    this.subjectList = this.helperSvc.subjects();
    // const toSelect = this.patientCategories.find(c => c.id == 3);
    // this.assignmentForm.get('phone_code').setValue(toSelect);

    this.addRecaptchaScript();
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' }
    ]);

  }


  flashText() {
    jQuery(() => {
      jQuery('.carousel').carousel({
        interval: 2000,
        pause: false
      });
      jQuery('.carousel2').carousel({
        interval: 2250,
        pause: false
      });
      jQuery('.documents-file-input').on('change', () => {
        const fileName = jQuery('.documents-file-input').val().split('\\').pop();
        const name = (fileName) ? fileName : 'No file chosen';
        const ext = name.split('.').pop();
        jQuery('.documents-file-input').next('.file-name-span')
          .addClass('selected').children('.custom-filename-span').html(name).attr('data-filetype', ext);
      });
    });
  }

  get fc() { return this.assignmentForm.controls; }

  initForm() {
    this.assignmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      subject: ['', Validators.required],
      due_date: ['', Validators.required],
      word_count: ['', Validators.required],
      phone_code: ['+91', Validators.required],
      phone: ['', Validators.required],
      file: ['', Validators.required],
      // univercity: ['', Validators.required],
      message: ['', Validators.required],
      reference_style: ['', Validators.required],
      term_condition: [true, Validators.required]
      // recaptcha: ['', Validators.required]
    });

  }

  openImagePopup() {
    // if (this.assignmentForm.valid) {
      this.dialog.open(this.previewBox, { height: '550px' });
    // }
  }

  formAppend(json) {
    const formData = new FormData();
    console.log(json);
    console.log(formData);
    // tslint:disable-next-line:forin
    for (const key in json) {
      formData.append(key, json[key]);
    }
    return formData;
  }

  documentFileUpload(event) {
    console.log(event);
    this.filesToUpload = (event.target.files as Array<File>);
    this.assignmentForm.patchValue({
      file: this.filesToUpload
    });
  }

  onSubmit() {
    if (this.assignmentForm.invalid) {
      return;
    }

    const formData = this.formAppend(this.assignmentForm.value);

    const files = this.filesToUpload;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }

    console.log(this.assignmentForm.value);
    console.log(formData);
    this.apiSvc.postService(this.constantSvc.APIConfig.ORDER_CREATE, formData).subscribe(
      res => {
        console.log('oooooooooooo', res);
        if (res.statusCode === 201 && res.statusType === 'success') {
          this.helperSvc.notifySuccess(res.message);
          // this.resetForm();
          this.resetFile();
          this.initForm();
          // this.dialog.closeAll();
          // this.openImagePopup();
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('error in add dealership info api ', err)
    );
  }

  resetForm() {
    this.assignmentForm.reset();
  }

  resetFile() {
    jQuery('.documents-file-input').next('.file-name-span').removeClass('selected')
      .children('.custom-filename-span').html('Choose file...').attr('data-filetype', '');
    this.assignmentForm.get('file').setValue('');
  }


}
