import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
// import * as $ from 'jquery';
const $ = require('jquery');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  successfulLogin: boolean = false;
  constructor(public myService: MyServiceService, private _router: Router) {
    // this.myService.getUserName().subscribe(
    //   (data) => {    this.myService.successfulLogin = true },
    //   (error) => {
    //     this._router.navigate(['/login']);
    //   }
    // );
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('.toggle').click(function () {
        $('.toggle').toggleClass('active');
        $('nav').toggleClass('active');
        console.log("dfsdfsd")
      });

      $('.menuLi').click(function () {
        $('.toggle').removeClass('active');
        $('nav').removeClass('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.myService.successfulLogin = false;
    this._router.navigate(['/login']);
  }

  showFilter(value: boolean) {
    this.myService.filterShow = value;
  }
}
