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

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  public register: FormGroup;

  private genders: string[] = ["Man", "Vrouw"];
  private user: User;

  public alertMessage:string = "";

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

  ngOnInit() {
    if (localStorage.getItem("user") !== null) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    var d = new Date(this.user.DoB);  
    d.setDate( d.getDate() + 1);
    this.selected = this.user.gender.toString();
    this.adapter.setLocale("nl");
    this.register = this.fbr.group({
      name: [this.user.name, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      nr: [
        this.user.location.number,
        [Validators.required, this.validateNumber]
      ],
      street: [this.user.location.street, [Validators.required]],
      city: [this.user.location.city, [Validators.required]],
      postal: [
        this.user.location.postalCode,
        [Validators.required, this.validateNumber]
      ],
      dateOfBirth: [d, [Validators.required]],
      gender: [this.user.gender, [Validators.required]]
    });
    this.register.controls.email.disable();
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
    var d = new Date(this.register.value.dateOfBirth);
    this.userDataService.updateUser(
      this.register.value.name,
      this.register.value.firstName,
      this.user.email,
      this.register.value.street,
      this.register.value.nr,
      this.register.value.gender,
      this.register.value.postal,
      this.register.value.city,
      d
    );
    this.alertMessage="Gegevens succesvol gewijzigd";
  }
}
