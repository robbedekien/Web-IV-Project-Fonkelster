import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Activity } from "../../models/activity.model";
import { Category } from "../../models/category.model";
import { ActivityDataService } from "../activity-data.service";
import * as _ from "lodash";
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/user/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  private _fetchActivities$: Observable<Activity[]> = this.activityDataService
    .activities$; 
  public loading: Boolean;
  private _categories: Category[];
  public isAdmin:Boolean;
  public backend:string = environment.backend;
  public alertMessage:string ="";

  public popoverTitle: string = 'Categorie verwijderen';
  public popoverMessage: string = 'Weet je zeker dat je de categorie wilt verwijderen?';
  
  constructor(
    private authService: AuthenticationService,
    private activityDataService: ActivityDataService,
    private router: Router
  ) {}

  ngOnInit() {
    if(localStorage.getItem("alert") !== null)
    {
      this.alertMessage = localStorage.getItem("alert");
      localStorage.removeItem("alert");
      setTimeout(() => {this.alertMessage = ""}, 3000);
    }
    this.loading = true;
      this._fetchActivities$.subscribe(as => {
        localStorage.setItem("Activities", JSON.stringify(as));
      });
      this.activityDataService.getCategories().subscribe(cs => {
        this._categories = cs;
        setTimeout(()=>{this.loading = false;}, 300);
      })
    this.isAdmin = (this.authService.user$.value === environment.adminEmail);
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

  delete(category:Category){
    this._categories.splice(this._categories.indexOf(category), 1);
    this.loading = true;
    this.activityDataService.deleteCategory(category.id).subscribe(val => this.loading = false);
  }
  
}
