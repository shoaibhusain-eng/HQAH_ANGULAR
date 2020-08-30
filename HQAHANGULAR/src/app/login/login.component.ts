import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantService, ApiService, AuthService, HelperService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;

  constructor(
    private formBilder: FormBuilder,
    private constantSvc: ConstantService,
    private helperSvc: HelperService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get fc() { return this.loginForm.controls; }

  resetForm() {
    this.loginForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.apiSvc.userLogin(this.constantSvc.APIConfig.USER_LOGIN, this.loginForm.value).subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.helperSvc.notifySuccess(res.message);
          this.router.navigate(['/home']);
          this.submitted = false;
        } else {
          this.helperSvc.notifyError(res.message);
        }
      },
      err => console.log('error in login API', err)
    );
  }
}
