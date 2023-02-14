import { AuthInterceptor } from './auth.interceptor';
import { SpinnerInterceptor } from './spinner.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SpinnerInterceptor,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    },

  ]
})
export class CoreModule { }
