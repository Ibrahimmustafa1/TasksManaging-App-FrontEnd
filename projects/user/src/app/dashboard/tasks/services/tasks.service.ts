import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks(filters: any) {
    let params = new HttpParams()
    Object.entries(filters).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value)
      }
    })
    return this.http.get(`${environment.baseApi}/tasks/user`, { params })
  }

  completeTask(taskId: any) {
    return this.http.patch(`${environment.baseApi}/tasks/${taskId}`, {})
  }

  getTaskDetails(taskId: any) {
    return this.http.get(`${environment.baseApi}/tasks/${taskId}`)
  }
}
