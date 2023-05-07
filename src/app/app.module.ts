import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoursesComponent } from './courses/courses.component';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { GetStudentsDataComponent } from './get-students-data/get-students-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MyServiceService } from './my-service.service';
import { HttpClientModule} from '@angular/common/http'
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { StudentPhotoComponent } from './student-photo/student-photo.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { GetEnquiryDataComponent } from './get-enquiry-data/get-enquiry-data.component';
import { PlacedStudentComponent } from './placed-student/placed-student.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginFormComponent,
    SignUpFormComponent,
    EnquiryFormComponent,
    AboutUsComponent,
    ContactUsComponent,
    CoursesComponent,
    AdmissionFormComponent,
    GetStudentsDataComponent,
    PageNotFoundComponent,
    RegisterComponent,
    StudentPhotoComponent,
    SocialLinksComponent,
    GetEnquiryDataComponent,
    PlacedStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyServiceService, {provide:LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
