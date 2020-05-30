import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetrievedUser } from './../RetrievedUser';
import { UserServiceService } from './../user-service.service';
import { TokenStorage } from './../core/token.storage';
import { Data } from './../data';
export interface ViewProfileRequest{
  emailId: string;
}
export interface SubjectView {
  subject: string;
  viewLink: string;
}
@Component({
  selector: 'app-class-six',
  templateUrl: './class-six.component.html',
  styleUrls: ['./class-six.component.scss']
})


export class ClassSixComponent implements OnInit {
  viewProfileRequest: ViewProfileRequest;
  retrievedUser: RetrievedUser = new RetrievedUser();
  displayNotes: boolean = false;
  displayNotesLink : boolean = true;
  linkToBeSendValue : string ;
  className: string;
  displayedColumns: string[] = ['subject', 'viewLink'];
  subjectViews: SubjectView[] = null;
  dataSource: any;
 // dataSource = this.subjectViews;
  constructor(private router:Router, private userService:UserServiceService, 
    private token:TokenStorage, private data: Data) { }

  ngOnInit() {
    this.className = JSON.stringify(this.data.storage, ["class"]).split(':"')[1].split('"}')[0];
    console.log(this.className+"******")
    if(this.className === "SIX"){
      this.subjectViews = [
        {subject: 'Bengali', viewLink: "https://drive.google.com/file/d/1ePnlGxS4Aje_MszdH_xizGwbMcZdCou8/preview"},
        {subject: 'English', viewLink: "link"},
        {subject: 'Mathematics', viewLink: "link"},
        {subject: 'Science', viewLink: "link"},
        {subject: 'History', viewLink: "link"},
        {subject: 'Geography', viewLink: "link"},
      ];
      this.dataSource = this.subjectViews;
    }else if(this.className === "TEN"){
      this.subjectViews = [
        {subject: 'Bengali', viewLink: "https://drive.google.com/file/d/1ePnlGxS4Aje_MszdH_xizGwbMcZdCou8/preview"},
        {subject: 'English', viewLink: "link"},
        {subject: 'Mathematics', viewLink: "link"},
        {subject: 'Science', viewLink: "link"},
        {subject: 'History', viewLink: "link"},
        {subject: 'Geography', viewLink: "link"},
      ];
      this.dataSource = this.subjectViews;
    }
    this.viewProfileRequest = {emailId: this.token.getUserId()}
    console.log(this.token.getUserId())
  //   this.userService.getUserProfile(this.viewProfileRequest).subscribe(
  //   data => {
  //     console.log(data)
  //     this.retrievedUser = data;
  //     if(this.retrievedUser.paymentStatus === "Not_Completed"
  //     || this.retrievedUser.paymentStatus === "Expired"){
  //       setTimeout(() => {
  //         this.router.navigate(['/payment']);
  //      }, 2000);
  //     }
  //   }
  // )
  }
  onClickView(link:string, subjectName:string){
    this.linkToBeSendValue = link;
    this.data.urlStorage ={
      "class" : this.className,
      "subjectName": subjectName
    }
    console.log(link);

    this.displayNotes = true;
    this.displayNotesLink = false;
    //this.route.navigate(['/display-notes']);
  }
}
