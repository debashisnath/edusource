import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { StudyMaterialsComponent } from './study-materials/study-materials.component';
import { ClassSixComponent } from './class-six/class-six.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { DisplayNotesComponent } from './display-notes/display-notes.component';
import { PaymentComponentComponent } from './payment-component/payment-component.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "register", component: UserRegistrationComponent},
  { path: "dashboard", component: UserDashboardComponent, canActivate: [CanActivateRouteGuard]},
  { path: "login", component: UserLoginComponent },
  { path: "study-materials", component: StudyMaterialsComponent, canActivate: [CanActivateRouteGuard]},
  { path: "class-six", component: ClassSixComponent, canActivate: [CanActivateRouteGuard]},
  { path: "display-notes", component: DisplayNotesComponent, canActivate: [CanActivateRouteGuard]},
  { path: "payment", component: PaymentComponentComponent, canActivate: [CanActivateRouteGuard]},
  { path: "payment-status", component: PaymentStatusComponent, canActivate: [CanActivateRouteGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [HomePageComponent, UserRegistrationComponent, UserDashboardComponent,
UserLoginComponent, StudyMaterialsComponent, ClassSixComponent, DisplayNotesComponent, PaymentComponentComponent,
PaymentStatusComponent];
