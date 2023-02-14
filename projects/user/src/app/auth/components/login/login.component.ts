import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private loginService: LoginService,private ToasrService: ToastrService,private router:Router) { }
  loginForm!: FormGroup
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  userLogin(Form:FormGroup){
    this.loginService.login(Form.value).subscribe((res:any)=>{
      localStorage.setItem('token',res.token);
      this.ToasrService.success('Login Successfully')
      this.router.navigate(['/tasks'])
    })
  }

}
