import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }
  allUsers: BehaviorSubject<any> = new BehaviorSubject(null);
  getAlltasks(filter: any) {
    let params = new HttpParams()
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value)
      }
    })


    return this.http.get(`${environment.baseApi}/tasks`, { params })
  }
  createNewTask(task: any) {
    return this.http.post(`${environment.baseApi}/tasks`, task)
  }
  deleteTask(taskId: any) {
    return this.http.delete(`${environment.baseApi}/tasks/${taskId}`)
  }
  updateTask(task: any, taskId: any) {
    return this.http.put(`${environment.baseApi}/tasks/${taskId}`, task)
  }
  getAllUsers() {
    let params = new HttpParams();
     this.http.get(`${environment.baseApi}/users`, { params }).subscribe(data=>{
      this.allUsers.next(data);
     })
  }
}
