import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-student-photo',
  templateUrl: './student-photo.component.html',
  styleUrls: ['./student-photo.component.css']
})
export class StudentPhotoComponent implements OnInit {

  constructor(private _myService:MyServiceService) { }

  ngOnInit(): void {
    
  }
  
  @Input() studentID:any
  // @Input() fetchedProfilePhoto:any
  @Output() newStudentPhotoUrl = new EventEmitter<string>()
  imgSrc = '../../assets/images/user.png'
  imgServerPath=""

  image:any
  selectImage(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
          this.imgSrc =event.target.result
      }

    }
  }

  changeFileName():string{
    const extension = this.image.name.split('.').pop();
    const newName =  this.studentID +'.' + extension;
    return newName;
  }

  public onSubmit(callback:any){
    if(!this.image){
      callback()
      return
    }
    const formData = new FormData();
    formData.append('file', this.image, this.changeFileName());

    this._myService.saveStudentPhoto(formData).subscribe(
      (res:any) => {
        this.assignNewStudentPhotoUrl(res.filename)
        callback()
      },
      (err) => alert("error in saving student photo")
    );
  }

  assignNewStudentPhotoUrl(name:string){
    let url = this._myService.BASE_URL + "/" + name
    console.log(url)
    this.newStudentPhotoUrl.emit(url);
  }


  setImagePathForShowData(path:string){
    if(path){
      this.imgSrc = path
    }else{
      this.imgSrc = '../../assets/images/user.png'
    }
  }

}
