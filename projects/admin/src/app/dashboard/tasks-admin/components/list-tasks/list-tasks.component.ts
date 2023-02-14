import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as moment from 'moment';

export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'user', 'deadLineDate', 'status', 'actions'];
  dataSource = [];
  filteration: any = {}
  timeOutId: any
  totalTasks: any;
  filters: any = {}
  page: number = 1
  tasksFilter!: FormGroup
  users: any = [
  ]

  status: any = [
    { name: "Complete", id: 'completed' },
    { name: "In-Progress", id: 'In-Progress' },
  ]
  constructor(public dialog: MatDialog, private fb: FormBuilder, private TasksService: TasksService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createform()
    this.getAllTasks()
    this.getAllUsers()
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: ['']
    })
  }

  getAllTasks() {

    this.TasksService.getAlltasks(this.filteration).subscribe((tasks: any) => {
      this.dataSource = tasks.tasks;
      this.totalTasks = Number(tasks.allTasksNumber)
    })
  }
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px', height: '750px',
      disableClose: true
    });

    // this.dialog.afterAllClosed
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.getAllTasks()

      }
    })
  }
  deleteTask(taskId: any) {

    this.TasksService.deleteTask(taskId).subscribe(data => {
      this.toastr.success('Task deleted successfully')
      this.getAllTasks()
    })
  }
  updateTask(task: any) {

    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px', height: '750px',
      data: task,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.getAllTasks()

      }
    })
  }
  getAllUsers() {
    this.TasksService.allUsers.subscribe((users: any) => {
      this.users = users?.users
      if(!this.users) return
      this.users = this.users.map((user: any) => {
        return { id: user._id, name: user.firstName + ' ' + user.lastName, email: user.email }
      })
    })
  }
  search(e: any) {
    this.filteration['keyword'] = e.target.value
    clearTimeout(this.timeOutId)
    this.timeOutId = setTimeout(() => {
      this.getAllTasks()
    }, 1000)

  }
  selectUser(e: any) {
    let userId = e.value
    this.filteration['userId'] = userId
    this.getAllTasks()
  }
  selectStatus(e: any) {
    let status = e.value
    this.filteration['status'] = status
    this.getAllTasks()
  }
  selectDate(e: any, type: any) {
    this.filteration[type] = moment(e.value).format('DD/MM/YYYY')
    if (this.filteration.from && this.filteration.to && this.filteration.to !== 'Invalid date' && type === 'to') {
      this.getAllTasks()
    }
  }
  pageChanged(page: any) {
    this.page = page
    this.filteration['page'] = page
    this.getAllTasks()
  }

}
