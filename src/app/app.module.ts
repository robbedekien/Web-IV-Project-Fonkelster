import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDatepicker, MatDatepickerModule, DateAdapter, MatNativeDateModule, MatSelectModule, MatExpansionModule, MatSpinner, MatProgressSpinnerModule, MAT_DATE_LOCALE } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './http-interceptors/index';
import { UserComponent } from './user/user/user.component';
import { AngularDropdownModule } from 'angular-dropdown';
import { CategoryComponent } from './activity/category/category.component';
import { ActivityDetailComponent } from './activity/activity-detail/activity-detail.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivityOperationsComponent } from './activity/activity-operations/activity-operations.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MemberActivitiesComponent } from './user/member-activities/member-activities.component';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {LOCALE_ID} from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AboutComponent } from './about/about.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ContactComponent } from './contact/contact.component';

registerLocaleData(localeNl, 'nl');


@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    MainNavComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegisterComponent,
    UserComponent,
    CategoryComponent,
    ActivityDetailComponent,
    ActivityOperationsComponent,
    MemberActivitiesComponent,
    AboutComponent,
    WorkspaceComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatSelectModule,
    MatExpansionModule,
    AngularDropdownModule,
    MatProgressSpinnerModule,
    NgbModalModule,
    NgxPaginationModule,
    MaterialFileInputModule,
    NgbModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
      cancelButtonType: 'warning'
    })
    ],
  providers: [httpInterceptorProviders, { provide: LOCALE_ID, useValue: 'nl' }, { provide: MAT_DATE_LOCALE, useValue: 'nl-NL'}],
  bootstrap: [AppComponent],
  exports: [ActivityDetailComponent]
})
export class AppModule { 
}
