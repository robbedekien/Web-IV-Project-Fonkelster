import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Location} from "../models/location.model";

export class User {
  constructor(
    private _name: string,
    private _firstName: string,
    private _email: string,
    private _location: Location,
    private _DoB: Date,
    private _gender: number,
    private _password: string
  ) {}

  static fromJSON(json: any): User {
    const u = new User(
      json.lastName,
      json.firstName,
      json.email,
      json.location.fromJSON(),
      json.dateOfBirth,
      json.gender,
      json._password
    );
    return u;
  }

  toJson() {
    return {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.name,
      dateOfBirth: this.DoB,
      gender: this.gender,
      location: this.location.toJSON()
    };
  }

  get name(): string {
    return this._name;
  }
  get firstName(): string {
    return this._firstName;
  }

  get email(): string {
    return this._email;
  }

  get location(): Location {
    return this._location;
  }

  get DoB(): Date {
    return this._DoB;
  }

  get gender(): number {
    return this._gender;
  }

  get password(): string {
      return this._password;
  }
}

