import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {

  constructor(private http:HttpClient) { }
  url = 'http://localhost:5001';

  getCourseIdAndPriceMap():Observable<any>{
    return this.http.get(`${this.url}/api/user/findCourse`).pipe(catchError(this.handleError));
  }

  getCourseDetailsResponse(emailId:string):Observable<any>{
    return this.http.get(`${this.url}/api/user/coursedetails/`+emailId).pipe(catchError(this.handleError));
  }
  handleError(error:HttpErrorResponse){
    let errorMessage='';
    if (error.status === 417) {
      errorMessage = 'XML Parsing Exception';

    }
    else if (error.status === 404) {
      errorMessage = 'Details not found';

    }
    else if(error.status === 406){
      errorMessage = 'Wrong Email Id Provided';
    }
    else if(error.status === 401){
      errorMessage = "User Id and password didn't match";
    }
    else{
      errorMessage=`Error Code:${error.status}\nMessage: ${error.message}`;
    } 
   // window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
