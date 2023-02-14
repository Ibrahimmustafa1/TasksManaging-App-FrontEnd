import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  register(form:any) {
    return this.http.post(`${environment.baseApi}/users/register`,form)
  }

  login(form:any) {
    return this.http.post(`${environment.baseApi}/users/login`,form)
  }
}
