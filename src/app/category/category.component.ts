import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Activity } from "../models/activity.model";
import { Category } from "../models/category.model";
import { ActivityDataService } from "../activity/activity-data.service";
import * as _ from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  private _fetchActivities$: Observable<Activity[]> = this.activityDataService
    .activities$;
  private _categories: Category[];
  constructor(
    private activityDataService: ActivityDataService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem("Activities") === null) {
      this._fetchActivities$.subscribe(as => {
        localStorage.setItem("Activities", JSON.stringify(as));
        this._categories = as.map(a => a.category);
      });
    } else 
    {
      this._categories = JSON.parse(localStorage
        .getItem("Activities"))
        .map(a => a.category);
    }
      
  }

  get activities$() {
    return this._fetchActivities$;
  }

  get categories() {
    return _.uniqWith(this._categories, _.isEqual).sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });;
  }

  
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
