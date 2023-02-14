import { ToastrService } from 'ngx-toastr';
import { Validator } from './../validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,private loginService: LoginService,private ToastrService:ToastrService,private router:Router) { }
  registerForm!: FormGroup
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: Validator.match('password', 'confirmPassword') })
  }

  registerUser(Form: FormGroup) {

    this.loginService.register(Form.value).subscribe(res=>{
      this.ToastrService.success('user registerd successfully')
      this.router.navigate(['/login']);
    })
  }

}
