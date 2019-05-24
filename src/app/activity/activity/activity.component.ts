import { Component, OnInit, Input } from "@angular/core";
import { Activity } from "../../models/activity.model";
import { ActivityDataService } from "../activity-data.service";
import { Observable } from "rxjs";
import { Category } from "../../models/category.model";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Location } from "@angular/common";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"]
})
export class ActivityComponent implements OnInit {
  private _activities: Activity[];
  private _selectedActivities: Activity[];
  public backend: string = environment.backend;
  public alertMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("alert") !== null) {
      this.alertMessage = localStorage.getItem("alert");
      localStorage.removeItem("alert");
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000);
    }
    this._activities = JSON.parse(localStorage.getItem("Activities"));
    this.route.paramMap.subscribe(pa => {
      this._selectedActivities = JSON.parse(
        localStorage.getItem("Activities")
      ).filter(
        a => _.lowerCase(a.category.name) == _.lowerCase(pa.get("category"))
      );
    });
  }

  get activities() {
    return this._selectedActivities;
  }

  back() {
    this.router.navigate(["/categorieën"]);
  }
}
