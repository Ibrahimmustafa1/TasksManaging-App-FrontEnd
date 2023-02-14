import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }
  counter: number = 0
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.counter++
    this.spinner.show();
    return next.handle(request).pipe(

      finalize(() => {
        this.counter--
        if (!this.counter) this.spinner.hide()
      })

    );
  }
}
