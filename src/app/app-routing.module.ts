import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity/activity.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user/user.component';
import { CategoryComponent } from './activity/category/category.component';
import { ActivityDetailComponent } from './activity/activity-detail/activity-detail.component';
import { ActivityOperationsComponent } from './activity/activity-operations/activity-operations.component';
import { MemberActivitiesComponent } from './user/member-activities/member-activities.component';
import { AuthGuard } from './user/auth.guard';
import { AboutComponent } from './about/about.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
  { path: 'categorieën', component: CategoryComponent },
  { path: 'categorie/:category', component: ActivityComponent},
  { path: 'activiteit/:activityId', component: ActivityDetailComponent},
  { path: 'wijzigActiviteit/:Id/:sort', canActivate: [ AuthGuard ], component: ActivityOperationsComponent},
  { path: 'over', component: AboutComponent},
  { path: 'praktijk', component: WorkspaceComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'overzichtInschrijvingen', canActivate: [ AuthGuard ], component: MemberActivitiesComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'account', canActivate: [ AuthGuard ], component: UserComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
