import { ErorHandlerInterceptor } from './eror-handler.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { SpinnerInterceptor } from './spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';





@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },

  ],

})
export class CoreModule { }
