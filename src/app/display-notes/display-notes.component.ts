import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { TokenStorage } from './../core/token.storage';
import { Router } from '@angular/router';
import { UserServiceService } from './../user-service.service';
import { RetrievedUser } from './../RetrievedUser';
import { CourseDetailsResponse } from './../CourseDetailsResponse';
import { CourseDetailsService } from './../course-details.service';
import { Data } from './../data';
import { timer } from 'rxjs';
import { CustomHttpResponse } from '../CustomHttpResponse';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../user-registration/user-registration.component';

export interface ViewProfileRequest{
  emailId: string;
}

export interface ValidateUserRequest{
  emailId: string;
  sessionId: string;
}
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.css']
})
export class DisplayNotesComponent implements OnInit {

  @Input()
  url: string ;
  
  urlSafe: SafeResourceUrl;
  viewProfileRequest: ViewProfileRequest;
  validateUserRequest : ValidateUserRequest;
  httpResponse : CustomHttpResponse;
  retrievedUser: RetrievedUser = new RetrievedUser();
  courseDetailsResponse : CourseDetailsResponse = new CourseDetailsResponse();
  className: string;
  subjectName: string;
  status: boolean;
  loginStatus: boolean;
  setTimeOut: boolean;
  validUser: boolean;

  timeLeft: number = 180;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.validateIsUserAuthentic();
        this.timeLeft = 180;
      }
    },10000)
  }
  validateIsUserAuthentic() {
    this.userService.validateLogInUser(this.validateUserRequest).subscribe(
      data=>{
        this.httpResponse = data;
        if( this.httpResponse.message === "User Logged In"){
          this.loginStatus = true;
        }
      },
      error=>{
        this.loginStatus = false;
        this.openDialog(error);
        this.token.userLogout();
        this.router.navigate(['/login']);
        clearInterval(this.interval);
      }
    )
  }
  constructor(public sanitizer: DomSanitizer, private router:Router, private userService:UserServiceService, 
    private token:TokenStorage, private courseDetailsService:CourseDetailsService, private data:Data, public dialog:MatDialog) { }

  ngOnInit() {
    //this.timeLeft = 20;
    
    this.className = JSON.stringify(this.data.urlStorage, ["class"]).split(':"')[1].split('"}')[0];
    this.subjectName = JSON.stringify(this.data.urlStorage, ["subjectName"]).split(':"')[1].split('"}')[0];
    console.log("****"+this.className+this.subjectName)
    this.viewProfileRequest = {emailId: this.token.getUserId()}
    this.validateUserRequest = {emailId: this.token.getUserId(), sessionId: this.token.getSession()}
    console.log(this.token.getUserId())
  //   this.userService.getUserProfile(this.viewProfileRequest).subscribe(
  //   data => {
  //     console.log(data)
  //     this.retrievedUser = data;
  //     if(this.retrievedUser.paymentStatus === "Not_Completed"
  //     || this.retrievedUser.paymentStatus === "Expired"){
  //       setTimeout(() => {
  //         this.router.navigate(['/payment']);
  //      }, 10000);
  //     }
  //   }
  // )
    console.log("hi - notes")
    console.log(this.url)
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    this.courseDetailsService.getCourseDetailsResponse(this.token.getUserId()).subscribe(
      data => {
        this.courseDetailsResponse = data;
        for(var course of this.courseDetailsResponse.productDetails){
          console.log(course)
          console.log(course.classDetails)
          console.log(this.className)
          console.log(course.classDetails == this.className)
          if(course.classDetails == this.className && this.checkUserSubscriptionStatus(course)){
            console.log("valid user")
            this.setTimeOut = false;
            this.validUser = true;
            this.startTimer();
          }else{
            console.log("invalid user")
            this.setTimeOut = true;
          }
          if(this.validUser){
            break;
          }
        }
        if(this.setTimeOut){
          console.log(this.setTimeOut)
          setTimeout(() => {
            this.router.navigate(['/payment']);
         }, 10000);
        }
        //console.log(this.courseDetailsResponse)
      },
      error =>{
        if(error === "Details not found"){
          setTimeout(() => {
            this.router.navigate(['/payment']);
         }, 10000);
        }
      }
    )
  }
  checkUserSubscriptionStatus(course: import("../CourseDetails").CourseDetails): boolean {
    this.status = false;


    console.log("inside status method")
    if(course.productStatusType == "Active"){
      for(var sub of course.subjectNameList){
        console.log(sub)
        if(sub == this.subjectName){
          this.status = true;
        }
      }
    }
    return this.status;
  }

  openDialog(message:string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {message: message}
    });

  }
}
