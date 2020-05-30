import { SubscriptionDetails } from './SubscriptionDetails';

export class CourseDetails{
    productId: string;
    productDescription: string;
    subjectNameList: string[];
    classDetails: string;
    noOfSubscriptionMonth: string;
    productStatusType: string;
    offeringPrice: string;
    subscriptionDetails: SubscriptionDetails = new SubscriptionDetails();
}