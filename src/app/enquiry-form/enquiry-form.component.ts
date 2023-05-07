import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent implements OnInit {

  constructor(private myService: MyServiceService, private _router: Router) {
    this.myService.getUserName().subscribe(
      (data) => {},
      (error) => {
        this._router.navigate(['/login']);
      }
    );

    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(date);

    this.getEnquiryNo();

    this.enquiryForm = new FormGroup({
      enquiryNo: new FormControl('null', Validators.required),
      enquiryDate: new FormControl(date, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      contactNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      nativePlace: new FormControl(null, Validators.required),
      education: new FormControl(null, Validators.required),
      stream: new FormControl(null, Validators.required),
      marks: new FormControl(null, Validators.required),
      collegeName: new FormControl(null, Validators.required),
      collegeCity: new FormControl(null, Validators.required),
      passOutYear: new FormControl(null, Validators.required),
      technologyLearned: new FormControl(null, Validators.required),
      coursesOrCertification: new FormControl(null, Validators.required),
      sscPercentage: new FormControl(null, Validators.required),
      hscPercentage: new FormControl(null, Validators.required),
      graduationPercentage: new FormControl(null, Validators.required),
      postGraduationPercentage: new FormControl(null, Validators.required),
      academicGap: new FormControl(null, Validators.required),
      anyQuery: new FormControl(null, Validators.required),
      pending: new FormControl(true)
    });

    this.showEnquiryData();
   }

  ngOnInit(): void {
  }

  enquiryForm: FormGroup;
  enquiryData = false;

  getEnquiryNo(){
    this.myService.getEnquiryNo().subscribe(
      (data:any) => {
        let enquiryNo = data.enquiryNo;

        if(enquiryNo.length == 1){
          enquiryNo = "0"+enquiryNo
        }

        const externalValue = { enquiryNo: enquiryNo };
        this.enquiryForm.patchValue(externalValue);
      },
      (error:any) => alert('Error in create enquiry number. Please refresh the page')
    )
  }

  showEnquiryData(){
    if (this.myService.showEnquiryVar) {
      this.myService
        .getEnquiryRecord({ id: this.myService.showEnquiryVar })
        .subscribe(
          (data) => {
            const externalValue = data;
            this.enquiryForm.patchValue(externalValue);
            this.enquiryData = true;
          },
          (error) =>
            alert("Something went wrong. Data can't be fetched from database")
        );
    }
    this.myService.showEnquiryVar = '';
  }

  addNew() {
    const formControls = this.enquiryForm.controls;
    Object.keys(formControls).forEach((key) => {
      formControls[key].setValue('');
    });
    this.getEnquiryNo();

    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const externalValue = { enquiryDate: date, pending:true };
    this.enquiryForm.patchValue(externalValue);
    this.enquiryData = false;
  }

  saveEnquiryData(){
    if (this.enquiryForm.valid) {
      this.myService.submitEnquiryForm(this.enquiryForm.value).subscribe(
        (data) => {
          alert('Enquiry successfully submitted'),
      this.myService.increaseEnquiryNo().subscribe(
          (data) => {
            this.addNew();
          },
          (error) => alert("Something went wrong. Data can't added to database")
          );
        },
        (error) => alert("Something went wrong. Data can't added to database")
      );
    } else {
      alert('Please fill all the Fields');
    }
  } 

}
