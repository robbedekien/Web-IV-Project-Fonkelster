import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.module";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  constructor(private http: HttpClient, private router: Router) {}

  getUser(email: string): Observable<User> {
    return this.http.get(`${environment.apiUrl}/Member/getUser/${email}`).pipe(
      map((json: any) => {
        if (json !== null) {
          return User.fromJSON(json);
        }
      })
    );
  }

  updateUser(
    lastName: string,
    firstName: string,
    email: string,
    street: string,
    nr: number,
    gender: number,
    postalCode: number,
    city: string,
    dateOfBirth: Date
  ): void {
    this.http
      .post(`${environment.apiUrl}/Member/updateUser/`, {
        name: lastName,
        firstName,
        email,
        dateOfBirth,
        gender,
        location: { street, number: nr, postalCode, city }
      })
      .subscribe(val => {
        this.getUser(email).subscribe(user => {
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(["/home"]);
        });
      });
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
