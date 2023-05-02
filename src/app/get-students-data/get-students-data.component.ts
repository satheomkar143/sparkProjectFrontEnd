import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-get-students-data',
  templateUrl: './get-students-data.component.html',
  styleUrls: ['./get-students-data.component.css'],
})
export class GetStudentsDataComponent implements OnInit {
  constructor(public myService: MyServiceService, private _router: Router) {
    this.myService.getUserName().subscribe(
      (data) => {},
      (error) => {
        this._router.navigate(['/login']);
      }
    );

    if(!this.myService.studentObject){
      this.initialFetch();
    }else{
      this.studentFilterResult()
    }
  }

  ngOnInit(): void {}


  saveExcel(){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.myService.studentObject);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'studentData.xlsx');
    
  }

  initialFetch() {
    this.myService.initialFetchData().subscribe(
      (data) => {
        this.myService.studentObject = data;
      },
      (error) => {}
    );
  }



  studentFilterResult() {
    this.myService.studentFilterResult(this.myService.StudentFilter).subscribe(
      (data) => {
        this.myService.studentObject = data;
      },
      (error) => {
        this.myService.studentObject = null;
        alert('No data found');
      }
    );
  }

  clearFilter() {
    this.myService.StudentFilter = {
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
  }

  deleteID: any;
  setDeleteVar(id: any) {
    this.deleteID = id;
  }

  deleteStudent() {
    this.myService.deleteStudentRecord({ id: this.deleteID }).subscribe(
      (data) => {
        alert('student data successfully deleted');
        this.myService.studentObject = this.myService.studentObject.filter((obj: { _id: any; }) => obj._id !== this.deleteID);

      },
      (error) => {
        alert('something went wrong.');
      }
    );
  }

  showStudent(id: any) {
    this.myService.showStudentVar = id;
    this._router.navigate(['/admission']);
  }
}
