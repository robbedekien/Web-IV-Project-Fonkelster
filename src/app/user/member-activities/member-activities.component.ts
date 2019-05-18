import { Component, OnInit } from "@angular/core";
import { Activity } from "src/app/models/activity.model";
import { ActivityDataService } from "src/app/activity/activity-data.service";
import { UserDataService } from "../user-data.service";
import { AuthenticationService } from "../authentication.service";
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material';

@Component({
  selector: "app-member-activities",
  templateUrl: "./member-activities.component.html",
  styleUrls: ["./member-activities.component.scss"]
})
export class MemberActivitiesComponent implements OnInit {
  public activities: Activity[];
  constructor(
    private memberService: UserDataService,
    private authService: AuthenticationService,
    private router: Router,
    private ActivityService: ActivityDataService
  ) {}

  ngOnInit() {
    if(this.authService.user$.value !== null)
    {
      this.memberService
      .getActivities(this.authService.user$.value)
      .subscribe(value =>
        setTimeout(() => {
          this.activities = value;
        }, 1000)
      );
    } else 
    {
      this.authService.redirectUrl = "overzichtInschrijvingen";
      this.router.navigate(["/register"]);
    }
    
  }

  unsubscribe(id: Number)
  {
    this.ActivityService.unsubscribe(this.authService.user$.value, id).subscribe(val => { 
      this.memberService
      .getActivities(this.authService.user$.value)
      .subscribe(value =>
        setTimeout(() => {
          this.activities = value;
        }, 1000)
      );
    });
    this.activities = null;
  }

}
