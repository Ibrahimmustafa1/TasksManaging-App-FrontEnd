import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'assignedTasks', 'actions'];
  dataSource: any;
  filters: any = {}
  page: number = 1
  totalUsers!: number
  constructor(private UsersService: UsersService) { }

  ngOnInit(): void {
    this.filters['page'] = 1
    this.getAllUsers()

  }

  getAllUsers() {
    this.UsersService.getAllUsers(this.filters).subscribe((users: any) => {
      this.dataSource = users.users
      this.dataSource = this.dataSource.map((user: any) => {
        return { id: user._id, name: user.firstName + ' ' + user.lastName, email: user.email, Tasks: user.tasks }
      })
      this.totalUsers = users.usersNumber
      console.log(this.dataSource)
    })
  }
  pageChanged(page: number): void {
    this.filters['page'] = page
    this.page = page
    this.getAllUsers()
  }
  search(e: any): void {
    this.filters['keyword'] = e.target.value
    this.getAllUsers()
  }
  removeUser(userId: any) {
    console.log(userId)
    this.UsersService.deleteUser(userId).subscribe(res => {
      console.log(res)
      this.getAllUsers()
    })
  }
}
