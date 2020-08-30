import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantService, ApiService, AuthService, HelperService } from '../core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;
  token = false;
  userId = '';

  constructor(
    private fb: FormBuilder,
    private constantSvc: ConstantService,
    private helperSvc: HelperService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const id = this.helperSvc.decoder(paramMap.get('params'));
      const token = this.helperSvc.decoder(paramMap.get('token'));
      this.userId = id;

      if (id && Number(token) > Date.now()) {
        this.token = true;
        console.log(id, Number(token) > Date.now(), token, Date.now());
      } else {
        this.token = false;
        this.helperSvc.notifyError('Link expire, try again');
        console.log(id, Number(token) > Date.now(), Number(token), Date.now());
      }
    });
  }

  initForm() {
    this.changePasswordForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  get fc() { return this.changePasswordForm.controls; }

  comparePass() {
    const password = this.changePasswordForm.value.password;
    const cPassword = this.changePasswordForm.value.confirm_password;
    if (password && cPassword && password !== cPassword) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (!this.token) {
      this.helperSvc.notifyError('token expire, try again');
      return;
    }

    this.changePasswordForm.patchValue({
      userId: this.userId
    });

    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    const formData = this.changePasswordForm.value;
    this.apiSvc.putService(this.constantSvc.APIConfig.UPDATE_PASSWORD, formData).subscribe(
        res => {
          if (res.statusCode === 200 && res.statusType === 'success') {
            this.helperSvc.notifySuccess(res.message);
            this.changePasswordForm.reset();
            this.router.navigate(['/signin']);
            this.submitted = false;
          } else {
            this.helperSvc.notifyError(res.message);
          }
        },
        err => console.log('error in change-password API', err)
      );
  }
}
