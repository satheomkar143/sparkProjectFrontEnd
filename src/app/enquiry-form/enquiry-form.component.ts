import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

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
   }

  ngOnInit(): void {
  }

}
