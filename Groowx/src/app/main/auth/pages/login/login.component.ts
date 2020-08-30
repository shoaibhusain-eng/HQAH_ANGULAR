import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { ApiService, AuthService, HelperService, ConstantService } from 'app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService,
    private constantSvc: ConstantService,
    private helperSvc: HelperService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private router: Router,
  ) {
            // Configure the layout
            this._fuseConfigService.config = {
              layout: {
                  navbar   : {
                      hidden: true
                  },
                  toolbar  : {
                      hidden: true
                  },
                  footer   : {
                      hidden: true
                  },
                  sidepanel: {
                      hidden: true
                  }
              }
          };
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.apiSvc.Login(this.constantSvc.APIConfig.LOGIN, this.loginForm.value).subscribe(
      res => {
        console.log(res);
        const currntUser = this.authSvc.currentUserValue;
        if (res.statusCode === 200 && res.statusType === 'success' && currntUser) {
          this.helperSvc.notifySuccess('Welcome back ' + currntUser.first_name);
          this.router.navigate(['/hrms/dashboard']);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      },
      err => console.log('error in login API', err)
    );
  }

}
