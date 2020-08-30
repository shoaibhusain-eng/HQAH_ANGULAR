import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConstantService, ApiService, AuthService, HelperService } from '../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;


  gender: [];
  dialCodes = [];
  selectedCountry = '+91';

  constructor(
    private formBilder: FormBuilder,
    private constantSvc: ConstantService,
    private helperSvc: HelperService,
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.dialCodes = this.helperSvc.countryCode();
  }

  initForm() {
    this.registrationForm = this.formBilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone_code: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      date_of_birth: ['', Validators.required]
    });
  }

  get fc() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;
    const countryCode = this.registrationForm.value.phone_code;
    const countryName = this.dialCodes.find(x => x.dial_code === countryCode);
    this.registrationForm.patchValue({
      country: countryName ? countryName.name : ''
    });

    if (this.registrationForm.invalid) {
      return;
    }
    this.apiSvc.postService(this.constantSvc.APIConfig.USER_REGISTRATION, this.registrationForm.value).subscribe(
      res => {
        console.log(res);
        if (res.statusCode === 201 && res.statusType === 'success') {
          this.helperSvc.notifySuccess(res.message);
          this.registrationForm.reset();
          this.submitted = false;
          this.router.navigate(['/signin']);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      },
      err => console.log('error in registration API', err)
    );
  }

}
