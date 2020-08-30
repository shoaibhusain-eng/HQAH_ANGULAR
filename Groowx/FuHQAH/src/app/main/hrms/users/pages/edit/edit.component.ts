import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';

import { HelperService, AuthGuard, AuthService, ApiService, ConstantService } from 'app/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditComponent implements OnInit, OnDestroy {

  // employee: Product;
  pageType: string;
  employeeEditForm: FormGroup;

  teams = [];
  userId = '';
  userName = '';

  constructor(
    // private _ecommerceProductService: EcommerceProductService,
    private _formBuilder: FormBuilder,
    private helperSvc: HelperService,
    private route: ActivatedRoute,
    private apiSvc: ApiService,
    private constantSvc: ConstantService,
  ) {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.teams = this.helperSvc.getTeams();
    this.initForm();
    this.getUserInfo();
  }

  initForm() {
    this.employeeEditForm = this._formBuilder.group({
      employee_details: this._formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
        job_title: ['', Validators.required],
        team: ['', Validators.required],
        level: ['', Validators.required],
        check_in: ['', Validators.required],
        check_out: ['', Validators.required],
        joining_date: ['', Validators.required],
        reporting_to: ['', Validators.required],
        employee_type: ['', Validators.required]
      }),
      personal_info: this._formBuilder.group({
        date_of_birth: ['', Validators.required],
        marital_status: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['', Validators.required],
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postal_code: ['', Validators.required],
        country: ['', Validators.required]
      }),
      emergency_contact: this._formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        relationship: ['', Validators.required],
        contact: ['', Validators.required]
      })
    });

  }

  getUserInfo() {
    this.apiSvc.getService(this.constantSvc.APIConfig.GET_USER, '?id=' + this.userId).subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.setValues(res.data);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when get user', err)
    );
  }

  ngOnDestroy(): void {
  }

  setValues(value) {
    this.userName = value.first_name + ' ' + value.last_name;
    this.employeeEditForm.get('employee_details').patchValue({
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      job_title: value.job_title,
      team: value.team,
      level: value.level,
      check_in: value.check_in,
      check_out: value.check_out,
      joining_date: new Date(value.joining_date),
      reporting_to: value.reporting_to,
      employee_type: value.employee_type
    });

    const personalInfo = value.personal_info ? value.personal_info : {};
    this.employeeEditForm.get('personal_info').patchValue(personalInfo);

    const emergencyContact = value.emergency_contact ? value.emergency_contact : {};
    this.employeeEditForm.get('emergency_contact').patchValue(emergencyContact);

  }

  empDetailSubmit(formGroup) {
    if (this.employeeEditForm.get(formGroup).invalid) {
      return;
    }

    let jsonData = {};

    if (formGroup === 'employee_details') {
      jsonData = this.employeeEditForm.get(formGroup).value;
    } else {
      jsonData[formGroup] = this.employeeEditForm.get(formGroup).value;
    }

    jsonData['id'] = this.userId;
    console.log(jsonData);

    this.apiSvc.postService(this.constantSvc.APIConfig.UPDATE_USER, jsonData).subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.helperSvc.notifySuccess('Information updated successfully');
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when update user', err)
    );
  }

}
