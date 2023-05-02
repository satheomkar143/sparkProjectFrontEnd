import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  successfulLogin:boolean=false;
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



  constructor(private _http: HttpClient) { }
  
  submitRegister(body:any){
    return this._http.post('http://localhost:3000/users/register', body,{
      observe:'body'
    });
  }

  login(body:any){
    return this._http.post('http://localhost:3000/users/login', body,{
      observe:'body'
    });
  }

  getUserName() {
  
      return this._http.get('http://localhost:3000/users/email', {
        observe: 'body',
        params: new HttpParams().append('token', JSON.stringify( localStorage.getItem('token')))
      });
   
  }

  sendEmail(body:any){
    return this._http.post('http://localhost:3000/users/sendmail', body,{
      observe:'body'
    });
  }

  submitSecurity(body:any){
    return this._http.post('http://localhost:3000/users/security', body,{
      observe:'body'
    });
  }

  submitAdmissionForm(body:any){
    return this._http.post('http://localhost:3000/users/admissionForm', body,{
      observe:'body'
    });
  }

  initialFetchData() {
    return this._http.get('http://localhost:3000/users/initialFetch', {
      observe: 'body'
    }); 
  }

  studentFilterResult(body:any){
    return this._http.post('http://localhost:3000/users/studentFilter', body,{
      observe:'body'
    });
  }

  deleteStudentRecord(body:any){
    return this._http.post('http://localhost:3000/users/deleteStudent', body,{
      observe:'body'
    });
  }
  
  updateStudentRecord(body:any){
    return this._http.post('http://localhost:3000/users/updateStudent', body,{
      observe:'body'
    });
  }
  
  getStudentRecord(body:any){
    return this._http.post('http://localhost:3000/users/getStudent', body,{
      observe:'body'
    });
  }

  getStudentID() {
    return this._http.get('http://localhost:3000/users/getStudentID', {
      observe: 'body'
    }); 
  }
 
  increaseCounter() {
    return this._http.get('http://localhost:3000/users/increaseCounter', {
      observe: 'body'
    }); 
  }

  changeMonthForId(body:any){
    return this._http.post('http://localhost:3000/users/changeMonth', body,{
      observe:'body'
    });
  }

  changeOTP() {
    return this._http.get('http://localhost:3000/users/changeOTP', {
      observe: 'body'
    }); 
  }

}
