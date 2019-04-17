import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Location} from "../models/location.model";

@Injectable({ providedIn: "root" })

export class User {
  private _name: string;
    private _firstName: string;
    private _email: string;
    private _location: Location;
    private _DoB: Date;
    private _gender: number;
  constructor(name:string, firstName:string, email:string, location:Location, DoB:Date, gender:number
  ) {
    this._name = name;
    this._firstName = firstName;
    this._email = email;
    this._location = location;
    this._DoB = DoB;
    this._gender = gender;
  }

  static fromJSON(json: any): User {
    const u = new User(
      json.name,
      json.firstName,
      json.email,
      Location.fromJSON(json.location),
      json.dateOfBirth,
      json.gender
    );
    return u;
  }

  toJson() {
    return {
      email: this.email,
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

}

