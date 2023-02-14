import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { TasksService } from '../../services/tasks.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({

  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialogRef<AddTaskComponent>, public matDialog: MatDialog, private TasksService: TasksService, private ToastrService: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  newTaskForm!: FormGroup
  oldTaskFormData!: any
  imgPreview: any = ''
  img: any = ''
  filters: any = {}
  users: any = [


  ]
  ngOnInit(): void {

    this.TasksService.allUsers.subscribe((users: any) => {
      this.users = users.users
      this.users = this.users.map((user: any) => {
        return { id: user._id, name: user.firstName + ' ' + user.lastName, email: user.email }
      })
    })

    this.imgPreview = this.data?.image
    this.img = this.data?.image

    this.newTaskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.minLength(3)]],
      userId: [this.data?.userId._id || '', [Validators.required, Validators.minLength]],
      description: [this.data?.description || '', [Validators.required, Validators.minLength(5)]],
      image: [this.data?.image || '', [Validators.required, Validators.minLength]],
      deadline: [this.data ? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '', [Validators.required, Validators.minLength]]
    })
    this.oldTaskFormData = this.newTaskForm.value

  }
  closeDialog() {
    let change = Object.keys(this.oldTaskFormData).every(key => this.oldTaskFormData[key] === this.newTaskForm.value[key])
    if (!change) {
      this.matDialog.open(ConfirmDialogComponent)
    }
    else {
      this.dialog.close()
    }
  }
  addTask(task: FormGroup): void {
    task.value.image = this.img

    if (this.data != null) {
      this.TasksService.updateTask(this.prepareFormData(task.value), this.data._id).subscribe(data => {

        this.ToastrService.success('Task Updated Succesfully')
        this.dialog.close(true)

      })

    }
    else {
      this.TasksService.createNewTask(this.prepareFormData(task.value)).subscribe(data => {
        this.ToastrService.success('Task created successfully')
        this.dialog.close(true)

      })
    }

  }
  prepareFormData(taskForm: any) {
    taskForm.deadline = moment(taskForm.deadline).format('DD-MM-YYYY')
    let formData = new FormData()
    Object.entries(taskForm).forEach(([key, data]: any) => {
      formData.append(key, data)
    })
    return formData
  }
  previewImg(e: any) {
    if (this.imgPreview !== '' && this.img !== '') {
      const reader = new FileReader();
      this.img = e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.imgPreview = reader.result;
      }

    }
    else return
  }

}
