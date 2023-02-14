import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './../../../../../user/src/app/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageUsersRoutingModule } from './manage-users-routing.module';

import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ManageUsersRoutingModule,
    HttpClientModule,
    CommonModule,NgxPaginationModule,NgxSpinnerModule
  ]
})
export class ManageUsersModule { }
