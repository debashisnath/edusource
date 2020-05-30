import { Component, OnInit } from '@angular/core';
import { Data } from './../data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  status: string;
  name: string;
  duration: string;
  displaySuccessMessage: boolean;
  displayFailedMessage: boolean;
  displayHoldMessage: boolean;
  constructor(private data: Data, private route:Router) {
  
  }
 routeToCourse(){
  this.route.navigate(['/study-materials'])
 }
  ngOnInit() {
  this.status = JSON.stringify(this.data.storage, ["paymentStatus"]).split(':"')[1].split('"}')[0];
  this.name = JSON.stringify(this.data.storage, ["name"]).split(':"')[1].split('"}')[0];
  this.duration = JSON.stringify(this.data.storage, ["duration"]).split(':"')[1].split('"}')[0];
  if(this.status === "Payment Successful"){
    this.displaySuccessMessage = true;
  }else if(this.status === "Payment Failed"){
    this.displayFailedMessage = true;
  }else if(this.status === "Payment On Hold"){
    this.displayHoldMessage = true;
  }
  
  }

}
