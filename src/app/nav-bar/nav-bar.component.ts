import { Component, OnInit } from '@angular/core';
import { TokenStorage } from './../core/token.storage';
import { Router } from '@angular/router';
import { UserServiceService } from './../user-service.service';
import { ViewProfileRequest } from './../class-six/class-six.component';
import { DialogComponent } from '../user-registration/user-registration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  logOutRequest: ViewProfileRequest;
  constructor(private token: TokenStorage, private route: Router, 
    public dialog:MatDialog, private userService: UserServiceService) { }

  ngOnInit() {
  }

  logOutUser(){
    this.logOutRequest = {emailId: this.token.getUserId()}
    this.userService.logOutUser(this.logOutRequest).subscribe(
      data => {
        console.log(data)
        this.token.userLogout();
        //this.openDialog("You have been logged out successfully");
        //this.route.navigate(['/']);
      }
    )
    
  }

  openDialog(message:string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {message: message}
    });

  }
}
