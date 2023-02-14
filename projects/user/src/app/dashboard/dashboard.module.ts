import { DashboardRoutingModule } from './dashboardmodule-routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,DashboardRoutingModule
  ]
})
export class DashboardModule { }
