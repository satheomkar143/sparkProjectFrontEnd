import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  successfulLogin:boolean=false;//------------------------------------------
  filterShow:boolean=false;

  showStudentVar:String="";

  studentObject: any;

  StudentFilter = {
    startDate: formatDate(new Date(1800, 1, 1), 'yyyy/MM/dd', 'en'),
    EndDate: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
    StudentID: '',
    name: '',
    contactNumber: '',
    gender: '',
    address: '',
    course: '',
    degree: '',
    college: '',
    stream: '',
    percentage: '',
    university: '',
    city: '',
    passOutYear: '',
  };

  // BASE_URL = "https://spark-management-api.onrender.com"
  BASE_URL = "http://localhost:3000"

  constructor(private _http: HttpClient) { }
  
  submitRegister(body:any){
    return this._http.post(this.BASE_URL+'/users/register', body,{
      observe:'body'
    });
  }

  login(body:any){
    return this._http.post(this.BASE_URL+'/users/login', body,{
      observe:'body'
    });
  }

  getUserName() {
  
      return this._http.get(this.BASE_URL+'/users/email', {
        observe: 'body',
        params: new HttpParams().append('token', JSON.stringify( localStorage.getItem('token')))
      });
   
  }

  sendEmail(body:any){
    return this._http.post(this.BASE_URL+'/users/sendmail', body,{
      observe:'body'
    });
  }

  sendSocialLinkEmail(body:any) {
    return this._http.post(this.BASE_URL+'/users/sendSocialLinkMail', body,{
      observe:'body'
    });
  }

  submitSecurity(body:any){
    return this._http.post(this.BASE_URL+'/users/security', body,{
      observe:'body'
    });
  }

  submitAdmissionForm(body:any){
    return this._http.post(this.BASE_URL+'/users/admissionForm', body,{
      observe:'body'
    });
  }

  initialFetchData() {
    return this._http.get(this.BASE_URL+'/users/initialFetch', {
      observe: 'body'
    }); 
  }

  studentFilterResult(body:any){
    return this._http.post(this.BASE_URL+'/users/studentFilter', body,{
      observe:'body'
    });
  }

  deleteStudentRecord(body:any){
    return this._http.post(this.BASE_URL+'/users/deleteStudent', body,{
      observe:'body'
    });
  }
  
  updateStudentRecord(body:any){
    return this._http.post(this.BASE_URL+'/users/updateStudent', body,{
      observe:'body'
    });
  }
  
  getStudentRecord(body:any){
    return this._http.post(this.BASE_URL+'/users/getStudent', body,{
      observe:'body'
    });
  }

  getStudentID() {
    return this._http.get(this.BASE_URL+'/users/getStudentID', {
      observe: 'body'
    }); 
  }
 
  increaseCounter() {
    return this._http.get(this.BASE_URL+'/users/increaseCounter', {
      observe: 'body'
    }); 
  }

  changeMonthForId(body:any){
    return this._http.post(this.BASE_URL+'/users/changeMonth', body,{
      observe:'body'
    });
  }

  changeOTP() {
    return this._http.get(this.BASE_URL+'/users/changeOTP', {
      observe: 'body'
    }); 
  }

  saveStudentPhoto(body:any){
    return this._http.post(this.BASE_URL+'/users/saveStudentPhoto', body,{
      observe:'body'
    });
  }

}
