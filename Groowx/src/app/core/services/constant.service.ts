import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  public APIBaseURL = 'http://localhost:7000/';
  public APIConfig = {
    LOGIN: 'employees/login',
    USER_CREATE: 'employees/create',
    USERS_LIST: 'employees/list',
    GET_USER: 'employees/getEmployee',
    DELETE_USER: 'employees/deleteUser',
    UPDATE_USER: 'employees/updateEmployee',
    

    SERVICE_CREATE: 'services/create',
    SERVICE_LIST: 'services/list',


    TEMPLATE_CREATE: 'template/create',
    TEMPLATE_LIST: 'template/list',
    TEMPLATE_DELETE: 'template/delete',
    TEMPLATE_UPDATE: 'template/update',
    TEMPLATE_GETONE: 'template/getOne',

    LEAD_LIST: 'order/list',



    SERVICEPAGE_CREATE: 'service-page/create',
    SERVICEPAGE_LIST: 'service-page/list',
    GET_SERVICEPAGE: 'service-page/getService',
    DELETE_SERVICEPAGE: 'service-page/deleteService',
    UPDATE_SERVICEPAGE: 'service-page/updateService',
  };
  public userToken = {
    USER_DATA: 'USER_DATA',
  };
  constructor() { }
}
