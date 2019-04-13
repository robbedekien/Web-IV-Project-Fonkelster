import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { ErrorStateMatcher, DateAdapter } from "@angular/material";
import { AuthenticationService } from "../user/authentication.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public login: FormGroup;

  private genders: string[] = ["Man", "Vrouw"];

  constructor(
    private _fbl: FormBuilder,
    private _fbr: FormBuilder,
    private _adapter: DateAdapter<any>,
    private _dataService: AuthenticationService,
    private router: Router
  ) {}

  get fbl(): FormBuilder {
    return this._fbl;
  }
  get fbr(): FormBuilder {
    return this._fbr;
  }
  get adapter(): DateAdapter<any> {
    return this._adapter;
  }
  get dataService(): AuthenticationService {
    return this._dataService;
  }

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
    this.adapter.setLocale("nl");
    this.register = this.fbr.group(
      {
        name: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        email: [
          "",
          [Validators.required, Validators.email],
          serverSideValidateUsername(this.dataService.checkUserNameAvailability)
        ],
        nr: ["", [Validators.required, this.validateNumber]],
        street: ["", [Validators.required]],
        city: ["", [Validators.required]],
        postal: ["", [Validators.required, this.validateNumber]],
        dateOfBirth: ["", [Validators.required]],
        password: ["", [Validators.required]],
        confirmPass: ["", [Validators.required]],
        gender: ["", [Validators.required]]
      },
      { validators: this.validatePassword }
    );

    this.login = this.fbl.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
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

  logIn() {
    this.dataService
      .login(this.login.value.email, this.login.value.password)
      .subscribe(val => {
        if (val) {
          if (this.dataService.redirectUrl) {
            this.router.navigateByUrl(this.dataService.redirectUrl);
            this.dataService.redirectUrl = undefined;
          } else {
            this.router.navigate(["/home"]);
          }
        }
      });
  }

  Register() {
    console.log("test");
    this.dataService
      .register(
        this.register.value.name,
        this.register.value.firstName,
        this.register.value.email,
        this.register.value.street,
        this.register.value.nr,
        this.register.value.gender,
        this.register.value.postal,
        this.register.value.city,
        this.register.value.dateOfBirth,
        this.register.value.password,
        this.register.value.confirmPass
      )
      .subscribe(val => {
        if (val) {
          this.router.navigate(["/home"]);
        }
      });
  }
}
