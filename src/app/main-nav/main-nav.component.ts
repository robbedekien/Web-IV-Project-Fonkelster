import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../user/user.module";
import { AuthenticationService } from "../user/authentication.service";
import { UserDataService } from "../user/user-data.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

    private _user$: BehaviorSubject<string> = this.authService.user$;
  public imagePrefix = environment.imagePrefix;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private userDataService: UserDataService
  ) {
  }

  get user():String {
    return this._user$.getValue();
  }
  
  isAdmin():boolean {
    return this._user$.getValue() === environment.adminEmail;
  }

  logOut(){
    this.authService.logout();
  }
}
