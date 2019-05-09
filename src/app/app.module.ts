import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatDatepicker, MatDatepickerModule, DateAdapter, MatNativeDateModule, MatSelectModule, MatExpansionModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';
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
import { CategoryComponent } from './category/category.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivityOperationsComponent } from './activity-operations/activity-operations.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';


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
    ActivityOperationsComponent
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
    MaterialFileInputModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [ActivityDetailComponent]
})
export class AppModule { }
