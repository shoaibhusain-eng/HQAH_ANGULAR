import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService
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
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
