import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-placed-student',
  templateUrl: './placed-student.component.html',
  styleUrls: ['./placed-student.component.css']
})
export class PlacedStudentComponent implements OnInit {

  constructor(private _myService:MyServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllPlacedStudent()
  }

  placedStudents:any

  studentData = {
    studentId : "",
    PlacedDate: "",
    companyName: "",
    companyLocation: "",
    position: "",
    salary: ""
  }

  savePlacedStudent(){
    let ValidData = Object.values(this.studentData).every(value => value && value !== '');
    
    if(ValidData){
      this._myService.savePlacedStudent(this.studentData).subscribe(
        (data)=>{
          this.getAllPlacedStudent()
          this.studentData = {
            studentId : "",
            PlacedDate: "",
            companyName: "",
            companyLocation: "",
            position: "",
            salary: ""
          }
        },
        (error)=>{
          alert("Could not save placed student")
        }
      )
    }else{
      alert("Please fill all the required fields");
    }
  }

  getAllPlacedStudent(){
    this._myService.getAllPlacedStudent().subscribe(
      (data:any)=>{
        const mergedArray = data.doc.map((obj1:any) => {
          const matchingObj = data.studentData.find((obj2:any) => obj2.studentId === obj1.studentId);
          return {...matchingObj,  ...obj1}
        });
        this.placedStudents = mergedArray
        console.log(this.placedStudents)
      },
      (error)=>{
        alert("Error in getting all placed students. try again.")
      }
    )
  }

  downloadPlacedStud(){
    if(this.placedStudents.length > 0){
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.placedStudents);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'placedStudents.xlsx');  
    }else{
      alert("no data for download.")
    }
    }

  deleteID: any;
  setDeleteVar(id: any) {
    this.deleteID = id;
  }

  deletePlacedStudent() {
    this._myService.deletePlacedStudent({ id: this.deleteID }).subscribe(
      (data) => {
        alert('student data successfully deleted');
        this.placedStudents = this.placedStudents.filter((obj: any) => obj._id !== this.deleteID);

      },
      (error) => {
        alert('something went wrong.');
      }
    );
  }

}
