import { Component, OnInit } from "@angular/core";
import { Activity } from "../../models/activity.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../user/authentication.service";
import { ActivityDataService } from "../activity-data.service";
import { environment } from 'src/environments/environment';

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
  public isAdmin: Boolean;
  public backend: string = environment.backend;

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
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        });
    } else {
      this.isLoading = false;
    }

    this.isAdmin = (this.authService.user$.value === environment.adminEmail);
    console.log(this.authService.user$.value);
    console.log(environment.adminEmail);
    console.log(this.isAdmin);
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

  delete() {
    this.activityService.deleteActivity(this.activity.id).subscribe(val => this.router.navigate(["/categorieën"]));
  }
}