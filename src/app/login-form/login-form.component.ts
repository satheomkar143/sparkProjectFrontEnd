import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { ActivatedRoute, Router } from '@angular/router';
const $ = require('jquery');

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  setVariable() {
    this._myService.successfulLogin = true;
  }

  register() {
    let user = {
      name: "SPARK Institute",
      email: this.loginForm.get("email")?.value
    };

    if(user.email){
    this._myService.sendEmail(user).subscribe(
      (data) => {
        alert('OTP send Successfully !');
      },
      (err) => {
        alert('Error in send email');
      }
    );
    }else{
      alert('Enter email address');
    }
  }

  constructor(
    private _myService: MyServiceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      otp: new FormControl(null, Validators.required),
      securityCode: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    $('input').on('focusout', function () {});
  }

  isValid(controlName: any) {
    return (
      this.loginForm.get(controlName)?.invalid &&
      this.loginForm.get(controlName)?.touched
    );
  }

  login() {
    if (this.loginForm.valid) {
      this._myService.login(this.loginForm.value).subscribe(
        (data) => {
          localStorage.setItem('token', data.toString());
          this.setVariable();
          this._router.navigate(['/home']);
          setTimeout(() => {
            this.changeOTP();
          }, 10000);
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('All Fields must be specified');
    }
  }

  changeOTP(){
    this._myService.changeOTP()
          .subscribe(
            data => console.log("otp successful canged"),
            error => console.log("otp not successful added")
          );
  }


}
