import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { IgxNavigationDrawerComponent } from "igniteui-angular";
import { TokenStorage } from './../core/token.storage';
import { ViewProfileRequest } from './../class-six/class-six.component';
import { UserServiceService } from './../user-service.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
logOutRequest: ViewProfileRequest;

constructor(private router:Router,private userService: UserServiceService, private token:TokenStorage) {
 
}
public ngOnInit(): void {
console.log(this.token.getUserId())
console.log(this.token.getUserName())
console.log(this.token.getSession())
}
@ViewChild(IgxNavigationDrawerComponent)
public drawer: IgxNavigationDrawerComponent;

closeDrawer(){
  this.drawer.close();
}

displayStudyMaterials(){
  this.closeDrawer();
  this.router.navigate(['/study-materials']);
  
}
userLogOut(){
  this.logOutRequest = {emailId: this.token.getUserId()}
    this.userService.logOutUser(this.logOutRequest).subscribe(
      data => {
        console.log(data)
        this.token.userLogout();
        //this.openDialog("You have been logged out successfully");
        this.router.navigate(['/']);
      }
    )
}
}
