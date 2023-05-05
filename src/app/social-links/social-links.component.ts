import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.css']
})
export class SocialLinksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() studentEmail: any

  sendSocialLink() {
    let user = {
      name: 'omkar',
      email: 'omkarsathe567@gmail.com',
    };

    if(this.studentEmail){
      alert(this.studentEmail)
    }else{
      alert("please provide a student email")
    }

    // this._myService.sendEmail(user).subscribe(
    //   (data) => {
    //     alert('OTP send Successfully !');
    //   },
    //   (err) => {
    //     alert('Error in send email');
    //   }
    // );
  }
}
