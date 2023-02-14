import { TasksService } from './../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private TasksService: TasksService,private router: Router) { }
  task:any=false
  ngOnInit(): void {
    let id
    this.ActivatedRoute.paramMap.subscribe((params: any) => {
      id = params.params.id
      this.TasksService.getTaskDetails(id).subscribe((task:any) => {
        this.task=task.Task
        console.log(this.task)
      })
    })
  }

  completeTask(taskId: any) {
    this.TasksService.completeTask(taskId).subscribe((task: any) => {
      this.router.navigate(['/tasks'])
    })
  }


}
