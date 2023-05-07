import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoursesComponent } from './courses/courses.component';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';
import { FooterComponent } from './footer/footer.component';
import { GetStudentsDataComponent } from './get-students-data/get-students-data.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { GetEnquiryDataComponent } from './get-enquiry-data/get-enquiry-data.component';
import { PlacedStudentComponent } from './placed-student/placed-student.component';

const routes: Routes = [
  // redirect route
  {path: '', redirectTo: 'login', pathMatch:'full'},

  {path: 'home', component: HomeComponent},
  // {path: 'about', component:AboutUsComponent},
  {path: 'admission', component:AdmissionFormComponent},
  // {path: 'contact', component:ContactUsComponent},
  // {path:'courses', component:CoursesComponent},
  {path:'enquiry', component:EnquiryFormComponent},
  {path:'getData', component:GetStudentsDataComponent},
  {path:'getEnquiry', component:GetEnquiryDataComponent},
  {path:'login', component:LoginFormComponent},
  {path: "placed", component:PlacedStudentComponent},
  // {path:'signUp', component:SignUpFormComponent},
  {path:'@3k@r9595/register', component:RegisterComponent},

  // wild card route
  {path:'**', component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
