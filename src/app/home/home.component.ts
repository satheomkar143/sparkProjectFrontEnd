import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private myService: MyServiceService, private _router: Router) {
    this.myService.getUserName().subscribe(
      (data) => {},
      (error) => {
        this._router.navigate(['/login']);
      }
    );
  }

  ngOnInit(): void {}
}
