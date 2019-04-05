import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { ErrorStateMatcher, DateAdapter } from "@angular/material";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public login: FormGroup;

  constructor(
    private fbl: FormBuilder,
    private fbr: FormBuilder,
    private adapter: DateAdapter<any>
  ) {}

  validatePassword(control: FormGroup): { [key: string]: any } {
    if (!(control.get("password").value === control.get("confirmPass").value)) {
        control.get('confirmPass').setErrors({ notSame : true });
    }
    return null;
  }

  validateNumber(control: FormControl): { [key: string]: any } {
    if (isNaN(control.value)) {
      return {notNumber: true}
    }
    return null;
  }

  ngOnInit() {
    this.adapter.setLocale("nl");
    this.register = this.fbr.group(
      {
        name: new FormControl("", [Validators.required]),
        firstName: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        nr: new FormControl("", [Validators.required, this.validateNumber]),
        street: new FormControl("", [Validators.required]),
        city: new FormControl("", [Validators.required]),
        postal: new FormControl("", [Validators.required, this.validateNumber]),
        bday: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        confirmPass: new FormControl("", [Validators.required])
      },
      { validators: this.validatePassword }
    );

    this.login = this.fbl.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  getErrorMessage(errors: any) {
    if (errors.notSame) {
      return "Wachtwoorden zijn niet dezelfde";
    } else if(errors.notNumber)
    {
      return "Ingevulde waarde moet een getal zijn";
    }
    if (errors.required) {
      return "Dit veld is verplicht";
    } else if (errors.minlength) {
      return `Dit veld moet minstens ${errors.minlength.requiredLength} 
        karakters bevatten (nu ${errors.minlength.actualLength})`;
    } else if (errors.email) {
      return "Dit veld bevat geen geldig e-mailadres";
    }
  }

  logIn() {
    console.log("test");
  }
  Register() {}
}
