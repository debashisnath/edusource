import 'rxjs';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import {
  UserRegistrationComponent,
  OTPtModalComponent,
  DialogComponent,
} from "./user-registration/user-registration.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule, MatNativeDateModule } from "@angular/material";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { enableProdMode } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxSmartModalModule } from "ngx-smart-modal";
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import {MatSelectModule} from '@angular/material/select';
import {
  IgxButtonModule,
  IgxIconModule,
  IgxLayoutModule,
  IgxNavigationDrawerModule,
  IgxRippleModule,
  IgxToggleModule,
  IgxSwitchModule,
  IgxRadioModule,
} from "igniteui-angular";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoaderComponent } from "./loader/loader.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptorService } from "./loader-interceptor.service";
import { FooterComponent } from "./footer/footer.component";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { TokenStorage } from "./core/token.storage";
import { StudyMaterialsComponent } from './study-materials/study-materials.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ClassSixComponent } from './class-six/class-six.component';
import { DisplayNotesComponent } from './display-notes/display-notes.component';
import { PaymentComponentComponent,DialogContentTandCDialog } from './payment-component/payment-component.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { Data } from './data';
import { CanActivateRouteGuard } from './can-activate-route.guard';
@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    UserRegistrationComponent,
    HomePageComponent,
    LoaderComponent,
    FooterComponent,
    OTPtModalComponent,
    DialogComponent,
    UserDashboardComponent,
    UserLoginComponent,
    StudyMaterialsComponent,
    NavBarComponent,
    ClassSixComponent,
    DisplayNotesComponent,
    PaymentComponentComponent,
    DialogContentTandCDialog,
    PaymentStatusComponent
  ],
  entryComponents: [OTPtModalComponent, DialogComponent, DialogContentTandCDialog],
  imports: [
  RouterModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgbModule,
    MatCheckboxModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    HttpClientModule,
    HttpModule,
    IgxButtonModule,
    IgxIconModule,
    IgxLayoutModule,
    IgxNavigationDrawerModule,
    IgxRippleModule,
    IgxToggleModule,
    IgxSwitchModule,
    IgxRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [
    Data,
    CanActivateRouteGuard,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
