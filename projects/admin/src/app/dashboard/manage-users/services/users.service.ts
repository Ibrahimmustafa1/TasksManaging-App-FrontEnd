import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  deleteUser(userId: string) {
    return this.http.delete(`${environment.baseApi}/users/${userId}`)
  }

  getAllUsers(filters:any) {
    console.log(filters);
    let params = new HttpParams();
    Object.entries(filters).map(([key,value]:any)=>{
      if (value) {
        params = params.append(key, value)
      }
    })
    console.log(params);
    return this.http.get(`${environment.baseApi}/users`, { params })
  }
}
