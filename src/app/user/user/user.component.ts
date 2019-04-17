import { Component, OnInit, Injectable } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { UserDataService } from "../user-data.service";
import {
  FormBuilder,
  Form,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../user.module";
import { template } from '@angular/core/src/render3';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  public register: FormGroup;

  private genders: string[] = ["Man", "Vrouw"];
  private user: User;

  private _fetchUser$: Observable<User> = this.userDataService.getUser(this.authService.user$.value);

  selected;

  constructor(
    private userDataService: UserDataService,
    private fbr: FormBuilder,
    private adapter: DateAdapter<any>,
    private authService: AuthenticationService
  ) {}


  validatePassword(control: FormGroup): { [key: string]: any } {
    if (!(control.get("password").value === control.get("confirmPass").value)) {
      control.get("confirmPass").setErrors({ notSame: true });
    }
    return null;
  }

  validateNumber(control: FormControl): { [key: string]: any } {
    if (isNaN(control.value)) {
      return { notNumber: true };
    }
    return null;
  }

  get user$(){
    // this._fetchUser$.subscribe(val => console.log(val));
    this._fetchUser$.subscribe(val => this.selected = val.gender.toString());
    return this._fetchUser$;
  }

  ngOnInit() {
    this.adapter.setLocale("nl");
    this.register = this.fbr.group(
      {
        name: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        nr: ["", [Validators.required, this.validateNumber]],
        street: ["", [Validators.required]],
        city: ["", [Validators.required]],
        postal: [
          "",
          [Validators.required, this.validateNumber]
        ],
        dateOfBirth: ["", [Validators.required]],
        gender: ["", [Validators.required]]
      }
    );
  }

  getErrorMessage(errors: any) {
    if (errors.notSame) {
      return "Wachtwoorden zijn niet dezelfde";
    } else if (errors.notNumber) {
      return "Ingevulde waarde moet een getal zijn";
    }

    if (errors.required) {
      return "Dit veld is verplicht";
    } else if (errors.minlength) {
      return `Dit veld moet minstens ${errors.minlength.requiredLength} 
        karakters bevatten (nu ${errors.minlength.actualLength})`;
    } else if (errors.email) {
      return "Dit veld bevat geen geldig e-mailadres";
    } else if (errors.userAlreadyExists) {
      return "Email is al geregistreerd";
    }
  }

  Update() {  
    this.userDataService.updateUser(
      this.register.value.name,
      this.register.value.firstName,
      this.register.value.email,
      this.register.value.street,
      this.register.value.nr,
      this.register.value.gender,
      this.register.value.postal,
      this.register.value.city,
      this.register.value.dateOfBirth
    );
  }
}
