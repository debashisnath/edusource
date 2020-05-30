import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseDetailsService } from './../course-details.service';
import { UserServiceService } from './../user-service.service';
import { RetrievedUser } from './../RetrievedUser';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Data } from './../data';
import { TokenStorage } from './../core/token.storage';

interface ViewProfileRequest{
  emailId: string;
}
interface ClassNames {
  classCode: string;
  classValue: string;
}
interface ClassDetails{
  category:string;
  classNames: ClassNames[];
}
interface SubjectNames {
  subjectCode: string;
  subjectValue: string;
}
interface CourseMap{
  key: string;
  value: string;
}
interface CourseDuration{
  monthCode: string;
  monthValue: string;
}
@Component({
  selector: 'app-payment-component',
  templateUrl: './payment-component.component.html',
  styleUrls: ['./payment-component.component.scss']
})
export class PaymentComponentComponent implements OnInit {

  public payuform: any = {};
  disablePaymentButton: boolean = true;
  courseIdAndPriceMap : Map<string, string> ;
  subjectDetails : SubjectNames[] = null;
  courseMap: CourseMap[] = null;
  courseDuration: CourseDuration[] = null;
  indicator:boolean = false;
  viewProfileRequest: ViewProfileRequest;
  retrievedUser: RetrievedUser = new RetrievedUser();
  paymentUser: RetrievedUser = new RetrievedUser();

  selectedClassCode: string;
  selectedSubjectCode: string;
  selectedMonthCode: string;
  course_id: string;
  coursePrice: string = "";

  classDetails: ClassDetails[] = [{
    category: 'School',
    classNames:[
      {classCode: 'TEN', classValue: '10th'},
      {classCode: 'ELVN', classValue: '11th'},
      {classCode: 'TWLV', classValue: '12th'}
    ]
  },
  {
    category: 'College',
    classNames:[
      {classCode: 'SEM1', classValue: '1st Semester'},
      {classCode: 'SEM2', classValue: '2nd Semester'},
      {classCode: 'SEM3', classValue: '3rd Semester'}
    ]
  }
  ];
  onSelectClass(classCode: string){
  console.log(classCode);
  this.selectedClassCode = classCode;
  this.processSubject(classCode);
  }
  processSubject (classCode: string){
  if(classCode === 'TEN'){
    this.subjectDetails = [
      {subjectCode: 'BEN', subjectValue: 'Bengali'},
      {subjectCode: 'ENG', subjectValue: 'English'},
      {subjectCode: 'MATH', subjectValue: 'Mathematics'},
      {subjectCode: 'SCI', subjectValue: 'Science'},
      {subjectCode: 'SST', subjectValue: 'Social Studies'},
      {subjectCode: 'ALL', subjectValue: 'All Subject'}
    ]
  }
  }
  onSelectSubject(subjectCode: string){
    console.log(subjectCode);
    this.selectedSubjectCode = subjectCode;
    this.processCourseDuration(subjectCode);
    }
  processCourseDuration(subjectCode: string) {
    this.courseDuration = [
      {monthCode: '01', monthValue: 'One Month'},
      {monthCode: '06', monthValue: 'Six Month'},
      {monthCode: '12', monthValue: 'One Year'}
    ]
  }
  onSelectCourseDuration(monthCode: string){
    this.selectedMonthCode = monthCode;
    this.course_id = this.selectedClassCode+"_"+this.selectedSubjectCode+"_"+this.selectedMonthCode;
    console.log(this.course_id) 
    this.processPrice(this.course_id)
  }
  processPrice(courseId: string) {
    for (const key in this.courseIdAndPriceMap) {
      console.log('The value for ' + key + ' is = ' + this.courseIdAndPriceMap[key]);
      if(key === courseId){
        this.coursePrice = this.courseIdAndPriceMap[key];
        this.updatePayUDetails(courseId,this.coursePrice);
      }
    }
  }
  updatePayUDetails(courseId: string, coursePrice: string) {
    this.payuform.productinfo = courseId;
    this.payuform.amount = coursePrice;
  }

  monitorPaymentStatus(){
    console.log("clicked");
    this.userService.monitorPaymentStatus(this.retrievedUser.emailId, this.retrievedUser.phoneNumber).subscribe(
      data =>{
        this.paymentUser = data;
        if(this.paymentUser.paymentStatus === "Success"){
          console.log("Payment Success")
          this.redirectToPaymentResult("Payment Successful")
        }else if(this.paymentUser.paymentStatus === "Failed"){
          console.log("Payment Failed")
          this.redirectToPaymentResult("Payment Failed")
        }else if(this.paymentUser.paymentStatus === "Initiated"){
          console.log("Payment On Hold")
          this.redirectToPaymentResult("Payment On Hold")
        }
      }
    )
    
  }

  redirectToPaymentResult(status:string){
    this.data.storage = {
      "paymentStatus": status,
      "name": this.retrievedUser.firstName +" "+ this.retrievedUser.lastName,
      "duration": this.selectedMonthCode
  }
    this.route.navigate(['/payment-status'])
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentTandCDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  constructor(private http: HttpClient, private courseDetailsService:CourseDetailsService,
    private userService:UserServiceService, public dialog: MatDialog, private route:Router,
    private data: Data, private token: TokenStorage) { 
    this.courseIdAndPriceMap = new Map<string, string>();
  }

  confirmPayment() {
    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.firstname,
      phone: this.payuform.phone,
      productInfo: this.payuform.productinfo,
      amount: this.payuform.amount
    }
    return this.http.post<any>('http://localhost:5000/payment/payment-details', paymentPayload).subscribe(
      data => {
      console.log(data);
      this.payuform.txnid = data.txnId;
      this.payuform.surl = data.sUrl;
      this.payuform.furl = data.fUrl;
      this.payuform.key = data.key;
      this.payuform.hash = data.hash;
      this.payuform.txnid = data.txnId;
        this.disablePaymentButton = false;
    }, error1 => {
        console.log(error1);
      })
  }


  ngOnInit() {
    this.viewProfileRequest = {emailId: this.token.getUserId()}

    this.userService.getUserProfile(this.viewProfileRequest).subscribe(
      data => {
        console.log(data)
        this.retrievedUser = data;
        this.updatePayUFormDetails();
      }
    )

    this.courseDetailsService.getCourseIdAndPriceMap().subscribe(
      data =>{
        console.log(data);
        this.courseIdAndPriceMap = data;
        this.courseMap = data;
        //console.log("Map"+this.courseIdAndPriceMap.get("TEN_BEN_01"))
        //console.log(this.courseMap);
        console.log(this.courseIdAndPriceMap);
        // for(let [key,value] of this.courseIdAndPriceMap){
        //   this.indicator = true;
        //   console.log("_")
        //   console.log(key)
        // }
        for (const key in this.courseIdAndPriceMap) {
          console.log('The value for ' + key + ' is = ' + this.courseIdAndPriceMap[key]);
        }
        console.log(this.courseIdAndPriceMap.size)
        console.log(this.indicator)
      },
      error=>{
        console.log(error)
      }
    )
  }
  updatePayUFormDetails() {
    this.payuform.firstname = this.retrievedUser.firstName+" "+this.retrievedUser.lastName;
    this.payuform.phone = this.retrievedUser.phoneNumber;
    this.payuform.email = this.retrievedUser.emailId;
    this.payuform.amount = " ";
    this.payuform.productinfo = " ";
  }

}


@Component({
  selector: 'dialog-content-tandc',
  templateUrl: 'dialog-content-tandc.html',
})

export class DialogContentTandCDialog {}