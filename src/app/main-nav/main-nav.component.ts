import { Component, ViewChild } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../user/user.module";
import { AuthenticationService } from "../user/authentication.service";
import { UserDataService } from "../user/user-data.service";
import { environment } from "src/environments/environment";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { MatSidenav } from '@angular/material';
import { Route, Router, Navigation } from '@angular/router';

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(map(result => !result.matches));

  private _user$: BehaviorSubject<string> = this.authService.user$;
  public imagePrefix = environment.imagePrefix;
  private currentNavigation;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private userDataService: UserDataService,
    config: NgbDropdownConfig,
    private router: Router
  ) {
  }

  get user(): String {
    return this._user$.getValue();
  }

  isAdmin(): boolean {
    return this._user$.getValue() === environment.adminEmail;
  }

  logOut() {
    this.authService.logout();
  }

  activity(){
    if(this.router.url.includes("wijzigActiviteit"))
    {
      this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
      this.router.navigate(['wijzigActiviteit', '-1', 'activity'])); 
    } else {
      this.router.navigate(['wijzigActiviteit', '-1', 'activity']);
    }
  }

}
