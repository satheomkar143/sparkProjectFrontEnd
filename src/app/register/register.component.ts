import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  successMessage: String = '';

  constructor(
    private _myService: MyServiceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator),
    });

    this.myForm.controls['password'].valueChanges.subscribe((x) =>
      this.myForm.controls['cnfpass'].updateValueAndValidity()
    );
  }

  ngOnInit(): void {}

  isValid(controlName: any) {
    return (
      this.myForm.get(controlName)?.invalid &&
      this.myForm.get(controlName)?.touched
    );
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true,
          };
        }
      }
    }

    return null;
  }

  register() {
    if (this.myForm.valid) {
      this._myService.submitRegister(this.myForm.value).subscribe(
        (data) => (this.successMessage = 'Registration Success'),
        (error) => (this.successMessage = 'SOme error')
      );
    } else {
      this.successMessage = 'error';
    }
  }

  // movetologin() {
  //   this._router.navigate(['../../login'], {
  //     relativeTo: this._activatedRoute,
  //   });
  // }

  // ---------------------
  // AddSecurity() {

  //   let SecurityDetails = {
  //     name: "omkar",
  //     OTP: "fg48@#",
  //     SecurityCode: "spark123"
  //   }

  //     this._myService.submitSecurity(SecurityDetails)
  //       .subscribe(
  //         data => alert("security successful added"),
  //         error => alert("security successful added")
  //       );
  // }

  // -------------------
}
