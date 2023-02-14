import { TasksService } from '../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadLineDate', 'status', 'actions'];
  dataSource: any;
  tasksFilter!: FormGroup
  filters: any = {}
  totalTaskCount!: number
  p: number = 1
  users: any = [
  ]

  status: any = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  constructor(public dialog: MatDialog, private fb: FormBuilder, private TasksService: TasksService) { }

  ngOnInit(): void {
    this.createform()
    this.getAllTasks()
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
    this.TasksService.getAllTasks(this.filters).subscribe((tasks:any) => {
      this.dataSource = tasks.userTasks;
      console.log(this.dataSource)
      this.totalTaskCount = tasks.allTasksNumber

    })
  }
  pageChanged(page: number) {
    this.p = page
    this.filters['page'] = this.p
    this.getAllTasks()
  }
  completeTask(taskId: any) {
    this.TasksService.completeTask(taskId).subscribe((task: any) => {
      this.getAllTasks()
    })
  }
}
