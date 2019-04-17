import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.module";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  constructor(private http: HttpClient) {}

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
    console.log("test");
    this.http.post(`${environment.apiUrl}/Member/updateUser/`, 
    {
      name : lastName,
      firstName,
      email,
      dateOfBirth,
      gender,
      location : {street, number:nr,postalCode, city}
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