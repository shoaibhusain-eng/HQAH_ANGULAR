import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  public APIBaseURL = 'http://localhost:7000/';
  public APIConfig = {
    USER_LOGIN: 'login',
    USER_REGISTRATION: 'signup',
    CHECK_EMAIL_FORGET_PASSWORD: 'checkEmailforForgetPassword',
    UPDATE_PASSWORD: 'updatePassword',
    ORDER_CREATE: 'order/create',



    GET_SERVICEPAGE: 'service-page/serviceTitles',
    GET_ONE_SERVICEPAGE: 'service-page/getService'
  };
  public userToken = {
    USER_DATA: 'USER_DATA',
  };
  constructor() { }
}
