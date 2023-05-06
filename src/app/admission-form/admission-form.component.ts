import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { filter, take } from 'rxjs/operators';
import { StudentPhotoComponent } from '../student-photo/student-photo.component';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css'],
})
export class AdmissionFormComponent implements OnInit {
  admissionForm: FormGroup;
  @ViewChild(StudentPhotoComponent) studentPhotoComponent: StudentPhotoComponent | undefined;

  constructor(
    private myService: MyServiceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.myService.getUserName().subscribe(
      (data) => {},
      (error) => {
        this._router.navigate(['/login']);
      }
    );

    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(date);

    this.getStudentID();

    this.admissionForm = new FormGroup({
      studentId: new FormControl('null', Validators.required),
      admissionDate: new FormControl(date, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      DOB: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      currentState: new FormControl(null, Validators.required),
      currentDistrict: new FormControl(null, Validators.required),
      currentCity: new FormControl(null, Validators.required),
      permanentState: new FormControl(null, Validators.required),
      permanentDistrict: new FormControl(null, Validators.required),
      permanentCity: new FormControl(null, Validators.required),
      personalNumber: new FormControl(null, Validators.required),
      parentNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      degree: new FormControl(null, Validators.required),
      stream: new FormControl(null, Validators.required),
      percentage: new FormControl(null, Validators.required),
      collegeName: new FormControl(null, Validators.required),
      university: new FormControl(null, Validators.required),
      passOutYear: new FormControl(null, Validators.required),
      backlogs: new FormControl(null, Validators.required),
      underGraduated: new FormControl(null, Validators.required),
      highestQualification: new FormControl(null, Validators.required),
      sscPercentage: new FormControl(null, Validators.required),
      hscPercentage: new FormControl(null, Validators.required),
      anyOtherCourses: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required),
      feesAllowed: new FormControl(null, Validators.required),
      studentProfilePhoto : new FormControl(null)
    });

    this.showDataForUpdate();
  }

  ngOnInit(): void {}

  parseData: any;

  getStudentID() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2); // get last 2 digits of year
    const month = date.toLocaleString('default', { month: 'short' }); // get short month name
    let id = 'll';
    this.myService.getStudentID().subscribe(
      (data) => {
        this.parseData = data;
        let counter = this.parseData.counter; // initialize counter

        if (this.parseData.prevMonth !== month) {
          counter = 1;

          try {
            this.myService.changeMonthForId({ month: month }).subscribe(
              (data) => console.log(data),
              (error) => console.log(error)
            );
          } catch (error) {
            console.log(error);
          }
        }

        id = year + month + counter.toString().padStart(3, '0');

        const externalValue = { studentId: id };
        this.admissionForm.patchValue(externalValue);
      },
      (error) => alert('Error in create student Id. Please refresh the page')
    );
  }

 async saveAdmissionData() {
    if (this.admissionForm.valid) {
     this.studentPhotoComponent?.onSubmit( () => {
       console.log(this.admissionForm.value)
     this.myService.submitAdmissionForm(this.admissionForm.value).subscribe(
        (data) => {
          alert('data successfully added'),
            this.myService.increaseCounter().subscribe(
              (data) => {
                this.addNew();
              },
              (error) => alert("Something went wrong. Data can't added to database")
            );
        },
        (error) => alert("Something went wrong. Data can't added to database")
      );
    })
    } else {
      alert('Please fill all the Fields');
      console.log(      this.admissionForm.errors        )
    }
  }

  updateData: boolean = false;
  localID: String = '';

  showDataForUpdate() {
    if (this.myService.showStudentVar) {
      this.myService
        .getStudentRecord({ id: this.myService.showStudentVar })
        .subscribe(
          (data) => {
            const externalValue = data;
            this.admissionForm.patchValue(externalValue);
            this.updateData = true;
            console.log(this.admissionForm.get("studentProfilePhoto")?.value)
            this.studentPhotoComponent?.setImagePathForShowData(this.admissionForm.get('studentProfilePhoto')?.value)
          },
          (error) =>
            alert("Something went wrong. Data can't be fetched from database")
        );
    }
    this.localID = this.myService.showStudentVar;
    this.myService.showStudentVar = '';
  }

  updateStudentData() {
    if (this.admissionForm.valid) {
      this.studentPhotoComponent?.onSubmit( () => {

      let myObject = { ...this.admissionForm.value, id: this.localID };

      this.myService.updateStudentRecord(myObject).subscribe(
        (data) => alert('Student data successfully updated'),
        (error) => alert('error in update data')
      );
      })
    } else {
      alert("Something went wrong. Data can't updated to database");
    }
  }

  addNew() {
    const formControls = this.admissionForm.controls;
    Object.keys(formControls).forEach((key) => {
      formControls[key].setValue('');
    });
    this.getStudentID();

    let date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    const externalValue = { admissionDate: date };
    this.admissionForm.patchValue(externalValue);
    this.updateData = false;
    this.studentPhotoComponent?.setImagePathForShowData(this.admissionForm.get('studentProfilePhoto')?.value)
  }

  copyValue: boolean = false;

  onChange() {
    if (this.copyValue) {
      this.copyValue = false;

      const externalValue = {
        permanentState: '',
        permanentDistrict: '',
        permanentCity: '',
      };
      this.admissionForm.patchValue(externalValue);
    } else {
      this.copyValue = true;

      this.admissionForm.patchValue({
        permanentState: this.admissionForm.get('currentState')!.value,
        permanentDistrict: this.admissionForm.get('currentDistrict')!.value,
        permanentCity: this.admissionForm.get('currentCity')!.value,
      });
    }
  }


  selectedState:String="";
  selectedDistrict:String="";

  states: string[] = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar' , 'Chhattisgarh',  "Goa", 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  
  districts= [    { state: 'Andhra Pradesh', district: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur','Kadapa', 'Krishna', 'Kurnool', 'Prakasam', 'Srikakulam','Visakhapatnam','Vizianagaram','West Godavari','YSR (Kadapa)'] },
];



getDistrict(dist:any){
  // console.log(this.districts.filter(x => x.state === dist))
  if(dist){
    // console.log(dist)
    let array= this.districts.filter(x => x.state === dist)
    console.log(array[0].district)
    // return ["om","kar"]
    return array[0].district
  }else{
    return []
  }
}

studEmail :string=""

updateStudentProfileValue(value: string) {
      this.admissionForm.get("studentProfilePhoto")?.setValue(value);
      // console.log("update value", this.admissionForm.get("studentProfilePhoto")?.value)
}

}
