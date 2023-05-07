import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-get-enquiry-data',
  templateUrl: './get-enquiry-data.component.html',
  styleUrls: ['./get-enquiry-data.component.css']
})
export class GetEnquiryDataComponent implements OnInit {

  constructor(public myService: MyServiceService, private _router: Router) { 
    this.myService.getUserName().subscribe(
      (data) => {},
      (error) => {
        this._router.navigate(['/login']);
      }
    );

    this.allEnquiries()
  }

  ngOnInit(): void {
  }

  allEnquiry:any
  fetchedAllEnquiries:any

  allEnquiries() {
    this.myService.FetchAllEnquiries().subscribe(
      (data) => {
        this.allEnquiry = data;
        this.fetchedAllEnquiries = data
      },
      (error) => {alert("something went wrong. try again.")}
    );
  }

  showEnquiry(id:any, pending:any){
    this.myService.showEnquiryVar = id;
    this._router.navigate(['/enquiry']);

    if(pending == "true"){
      this.myService.changePendingStatus({id:id}).subscribe(
        (data) => {},
        (error) => {}
      );
    }
  }

  downloadAll(){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.fetchedAllEnquiries);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    /* save to file */
    XLSX.writeFile(wb, 'studentEnquiries.xlsx');   
  }

  downloadPending(){
    let enquiries = this.fetchedAllEnquiries.filter((enquiry:any) => enquiry.pending == "true")

    if(enquiries.length > 0){
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(enquiries);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      /* save to file */
      XLSX.writeFile(wb, 'pendingEnquiries.xlsx');   
    }else{
      alert("No pending enquiries for download.")
    }
  }

  showPending(){
    this.allEnquiry = this.fetchedAllEnquiries.filter((enquiry:any) => enquiry.pending == "true")
  }

  deleteID: any;
  setDeleteVar(id: any) {
    this.deleteID = id;
  }

  deleteEnquiry(){
    this.myService.deleteEnquiry({ id: this.deleteID }).subscribe(
      (data) => {
        alert('Enquiry successfully deleted');
        this.allEnquiry = this.allEnquiry.filter((enquiry:any) => enquiry._id !== this.deleteID);
      },
      (error) => {
        alert('Error in delete enquiry');
      }
    );
  }
}

