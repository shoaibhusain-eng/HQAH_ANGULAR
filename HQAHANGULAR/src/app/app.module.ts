import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { SharedModule } from './shared/shared.module';

import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReviewComponent } from './layouts/footer/review/review.component';
import { UsefullLinksComponent } from './layouts/footer/usefull-links/usefull-links.component';
import { CopyRightBarComponent } from './layouts/footer/copy-right-bar/copy-right-bar.component';
import { HqahServicesrComponent } from './layouts/footer/hqah-servicesr/hqah-servicesr.component';
import { SocialMediaBarComponent } from './layouts/header/social-media-bar/social-media-bar.component';
import { TitleBarComponent } from './layouts/header/title-bar/title-bar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomePageLayoutComponent } from './layouts/home-page-layout/home-page-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ServiceBarComponent } from './layouts/header/service-bar/service-bar.component';
import { RegistrationComponent } from './registration/registration.component';
// import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserPageLayoutComponent } from './layouts/user-page-layout/user-page-layout.component';
import { UserPageHeaderComponent } from './layouts/user-page-header/user-page-header.component';
import { UserPageFooterComponent } from './layouts/user-page-footer/user-page-footer.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ReviewComponent,
    UsefullLinksComponent,
    CopyRightBarComponent,
    HqahServicesrComponent,
    SocialMediaBarComponent,
    TitleBarComponent,
    FooterComponent,
    HomePageLayoutComponent,
    HeaderComponent,
    ServiceBarComponent,
    RegistrationComponent,
    ChangePasswordComponent,
    UserPageLayoutComponent,
    UserPageHeaderComponent,
    UserPageFooterComponent
    // ComingSoonComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSliderModule,
    SharedModule,
    AngularMaterialModule,
    CoreModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
