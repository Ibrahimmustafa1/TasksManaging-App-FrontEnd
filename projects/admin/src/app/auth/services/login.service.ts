import { Login } from './../login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  login(form: Login) {
    return this.http.post(`${environment.baseApi}/users/login`,form)
  }
}
