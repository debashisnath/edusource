import { RetrievedUser } from './RetrievedUser';
import { CourseDetails } from './CourseDetails';
export class CourseDetailsResponse{
     profileDetails: RetrievedUser = new RetrievedUser();
     productDetails: CourseDetails[] = new Array();
     purchaseStatus: string;
     noOfCourseTaken: string;
}