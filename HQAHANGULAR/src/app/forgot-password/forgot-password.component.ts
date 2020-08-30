import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantService, ApiService, AuthService, HelperService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPassForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private constantSvc: ConstantService,
    private helperSvc: HelperService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get fc() { return this.forgetPassForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.forgetPassForm.invalid) {
      return;
    }
    const Email = this.forgetPassForm.value.email;
    this.apiSvc.getService(this.constantSvc.APIConfig.CHECK_EMAIL_FORGET_PASSWORD,
      '?email=' + Email).subscribe(
        res => {
          if (res.statusCode === 200 && res.statusType === 'success') {
            this.helperSvc.notifySuccess(res.message);
            this.forgetPassForm.reset();
            this.submitted = false;
          } else {
            this.helperSvc.notifyError(res.message);
          }
        },
        err => console.log('error in forget-password API', err)
      );
  }
}
