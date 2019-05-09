import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Location} from "../models/location.model";

export class User {
  name: string;
  firstName: string;
  email: string;
  location: Location;
  DoB: Date;
  gender: number;
  constructor(name:string, firstName:string, email:string, location:Location, DoB:Date, gender:number
  ) {
    this.name = name;
    this.firstName = firstName;
    this.email = email;
    this.location = location;
    this.DoB = DoB;
    this.gender = gender;
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

}

