
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    canActivate: [AuthGuard]
    ,children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      {
        path: 'tasks',
        loadChildren: () => import(`./tasks/tasks.module`).then(m => m.TasksModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
