import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { User } from './../user';
import { UserServiceService } from '../user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  message: string;
}
/**
 * @title Stepper that displays errors in the steps
 */
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})


export class UserRegistrationComponent implements OnInit {
  user: User = new User();
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  phoneNumber: string;
  otp: string;
  displayFinishMsg: boolean = false;
  displayOTP: boolean = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private userService: UserServiceService, 
    private router:Router, private modalService: NgbModal, public dialog: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9 ]*')]],
      emailId: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      otp: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  onSubmit(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.user.firstName = this.firstName;
      this.user.lastName = this.lastName;
      this.user.phoneNumber = this.phoneNumber;
      this.user.emailId = this.emailId;
      this.user.password = this.password;

      this.userService.registerUser(this.user).subscribe(
        data=>{
        this.openDialog("6 Digit OTP has been sent to Email Id"),
        this.displayOTP = true;
        },
        error =>{console.log(error);this.openDialog(error)}
      )
    } else{
      this.openDialog("Please provide valid details !!")
      //window.alert("Please provide valid details !!")
    }
    
  }

  onSubmitOTP(){
    if(this.thirdFormGroup.valid){
      this.userService.submitOTP(this.emailId, this.otp).subscribe(
        data =>{this.modalService.open(OTPtModalComponent),
        this.router.navigate(['/login'])},
        error=>{console.log(error); this.openDialog(error)}
      )
    }
    else{
      this.openDialog("Please Enter Valid OTP");
     // window.alert("Please Enter Valid OTP")
    }
  }
  onChange(){
    console.log(this.firstName, this.lastName, this.password, this.phoneNumber, this.emailId);
    console.log(this.firstFormGroup.valid);
  }

  openDialog(message:string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {message: message}
    });

  }
}

@Component({
  selector: 'logout-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Message!!</h4>
    </div>
    <div class="modal-body">
      <p>You have been successfully registered</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Ok</button>
    </div>
  `
})
export class OTPtModalComponent{
  constructor(public activeModal: NgbActiveModal, private router:Router) {}
}

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog-component.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public router:Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}