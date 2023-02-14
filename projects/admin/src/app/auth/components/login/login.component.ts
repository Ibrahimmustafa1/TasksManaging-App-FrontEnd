import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private ToastrService: ToastrService) { }
  loginForm!: FormGroup
  errMsg!: string
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  login(form: FormGroup): void {

    this.loginService.login(form.value).subscribe((data: any) => {
      localStorage.setItem('token', data.token)

      this.ToastrService.success('Login Successfully')
      this.router.navigate(['/tasks']);
    })
  }


}

