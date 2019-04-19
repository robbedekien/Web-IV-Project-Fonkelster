import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.module";
import { UserDataService } from "./user-data.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private readonly _token = "currentUser";
  private _user$: BehaviorSubject<string>;
  private _redirectUrl: string;

  constructor(private http: HttpClient, private dataService: UserDataService, private router: Router, private userDataService:UserDataService) {
    let parsedToken = parseJwt(localStorage.getItem(this._token));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._token);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  }

  register(
    lastName: string,
    firstName: string,
    email: string,
    street: string,
    nr: number,
    gender: number,
    postalCode: number,
    city: string,
    dateOfBirth: Date,
    password: string,
    passwordConfirmation: string
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/Account/register`,
        {
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          location: { street, nr, postalCode, city },
          passwordConfirmation
        },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._token, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/Account`,
        { email, password },
        { responseType: "text" }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._token, token);
            this.userDataService.getUser(email).subscribe(user => {localStorage.setItem("user", JSON.stringify(user))});
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    console.log(this.user$.getValue());
    if (this.user$.getValue()) {
      localStorage.removeItem("currentUser");
      this._user$.next(null);
      this.router.navigate(["/home"]);
    }
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
  };

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token() {
    return this._token;
  }

  get redirectUrl() {
    return this._redirectUrl;
  }
  set redirectUrl(s: string) {
    this._redirectUrl = s;
  }
}

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split(".")[1];
  const base64 = base64Token.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}
