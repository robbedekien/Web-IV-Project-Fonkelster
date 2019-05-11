import { Component, OnInit } from "@angular/core";
import { Activity } from "../../models/activity.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../user/authentication.service";
import { ActivityDataService } from "../activity-data.service";

@Component({
  selector: "app-activity-detail",
  templateUrl: "./activity-detail.component.html",
  styleUrls: ["./activity-detail.component.scss"]
})
export class ActivityDetailComponent implements OnInit {
  public activity: Activity;
  public p: number = 1;
  public isRegistered: Boolean;
  public isLoading: Boolean;
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private activityService: ActivityDataService
  ) {}

  ngOnInit() {
    this.isRegistered = false;
    this.isLoading = true;
    if (localStorage.getItem("Activities") !== null) {
      this.route.paramMap.subscribe(pa => {
        this.activity = JSON.parse(localStorage.getItem("Activities")).filter(
          a => a.id == pa.get("activityId")
        )[0];
      });
    }

    if (this.authService.user$.value !== null) {
      this.activityService
        .checkRegistered(this.authService.user$.value, this.activity.id)
        .subscribe(value => {
          this.isRegistered = value;
          console.log(this.isRegistered);
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        });
    } else {
      this.isLoading = false;
    }

    console.log(this.activity);
  }

  register() {
    if (this.authService.user$.value === null) {
      this.authService.redirectUrl = `activiteit/${this.activity.id}`;
      this.router.navigate(["/register"]);
    } else {
      this.activityService.register(
        this.authService.user$.value,
        this.activity.id
      );
      this.isRegistered = true;
      this.isLoading = true;
      setTimeout(()=>{this.isLoading = false}, 1000);
    }
  }

  unsubscribe() {
    this.activityService.unsubscribe(
      this.authService.user$.value,
      this.activity.id
    ).subscribe(val => {});
    this.isRegistered = false;
    this.isLoading = true;
    setTimeout(()=>{this.isLoading = false}, 1000);
  }
}
