import { Component, Input, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.css']
})
export class SocialLinksComponent implements OnInit {

  constructor(private _myService : MyServiceService) { }

  ngOnInit(): void {
  }

  @Input() studentEmail: any

  sendSocialLink() {
    let user = {
      name: 'SPARK Institute',
      email: this.studentEmail,
    };

    if(this.studentEmail){
      this._myService.sendSocialLinkEmail(user).subscribe(
        (data) => {
          alert('social links send Successfully !');
        },
        (err) => {
          alert('Error in send email. please try again.');
        }
      );
    }else{
      alert("please provide a student email address.")
    }

    
  }
}
