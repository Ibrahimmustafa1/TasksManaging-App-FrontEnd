import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErorHandlerInterceptor implements HttpInterceptor {

  constructor(private ToastrService:ToastrService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.ToastrService.error(err.error.message)
        if(err.error.message==='This Route Require Authenticated User' || err.error.message==='Invalid Token' || err.error.message=='User Not Found' || err.error.message=='U are Not Authorized'){
          this.router.navigate(['/login'])
        }
        throw err;
      })
    );
  }
}
