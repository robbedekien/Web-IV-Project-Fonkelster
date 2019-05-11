import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { DateAdapter } from "@angular/material";
import { ActivityDataService } from "../activity-data.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpEventType } from "@angular/common/http";
import { Category } from "src/app/models/category.model";

@Component({
  selector: "app-activity-operations",
  templateUrl: "./activity-operations.component.html",
  styleUrls: ["./activity-operations.component.scss"]
})
export class ActivityOperationsComponent implements OnInit {
  activity: FormGroup;
  category: FormGroup;
  p : number = 1;
  imgURL: any;
  public frontImageIndex: number;
  public categories: Category[];
  public activityImages: string[] = [];

  constructor(
    private _fba: FormBuilder,
    private _fbc: FormBuilder,
    private _adapter: DateAdapter<any>,
    private _activityService: ActivityDataService,
    private router: Router
  ) {}

  get fba(): FormBuilder {
    return this._fba;
  }
  get fbc(): FormBuilder {
    return this._fbc;
  }
  get adapter(): DateAdapter<any> {
    return this._adapter;
  }
  get activityService(): ActivityDataService {
    return this._activityService;
  }

  ngOnInit() {
    this.adapter.setLocale("nl");
    this.adapter.getFirstDayOfWeek = () => {
      return 1;
    };
    this.activityService
      .getCategories()
      .subscribe(res => (this.categories = res));
    this.activity = this.fba.group({
      name: [
        "",
        [Validators.required],
        serverSideValidateCategoryName(
          this._activityService.checkCategoryNameAvailability
        )
      ],
      categories: ["", [Validators.required]],
      description: ["", [Validators.required]],
      start: ["", [Validators.required]],
      end: ["", [Validators.required]],
      image: ["", [Validators.required]]
    });

    this.category = this.fbc.group({
      name: [
        "",
        [Validators.required],
        serverSideValidateCategoryName(
          this._activityService.checkCategoryNameAvailability
        )
      ],
      image: ["", [Validators.required]]
    });
  }

  getErrorMessage(errors: any) {
    if (errors.required) {
      return "Dit veld is verplicht";
    } else if (errors.minlength) {
      return `Dit veld moet minstens ${errors.minlength.requiredLength} 
        karakters bevatten (nu ${errors.minlength.actualLength})`;
    } else if (errors.email) {
      return "Dit veld bevat geen geldig e-mailadres";
    } else if (errors.nameAlreadyExists) {
      return "Categorie is al geregistreerd";
    }
  }

  previewActivity() {
    this.activityImages = [];
    if (this.activity.value.image.files.length === 0) return;
    let files = this.activity.value.image.files;
    console.log(files);
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.activityImages.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
    console.log(this.activityImages);
  }

  previewCategory() {
    if (this.category.value.image.files.length === 0) return;

    var reader = new FileReader();
    reader.readAsDataURL(this.category.value.image.files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }

  removeImageCategory() {
    this.imgURL = "";
  }
  removeImageActivity()
  {
    this.activityImages = [];
  }

  addCategory() {
    this.activityService
      .uploadFile(this.category.value.image.files)
      .subscribe(event => {
        var urls = this.fromJSON(event);
        this.activityService
          .addCategory(this.category.value.name, urls[0])
          .subscribe(val => {
            console.log(val);
            if (val) {
              this.router.navigate(["/home"]);
            }
          });
      });
  }

  addActivity() {
    this.activityService
      .uploadFile(this.category.value.image.files)
      .subscribe(event => {
        var urls = this.fromJSON(event);
        this.activityService
          .addCategory(this.category.value.name, urls[0])
          .subscribe(val => {
            console.log(val);
            if (val) {
              this.router.navigate(["/home"]);
            }
          });
      });
  }

  public fromJSON(json: any): string[] {
    var res: string[] = json.paths;
    return res;
  }

  frontImage(url:string){
    this.frontImageIndex = this.activityImages.indexOf(url);
    console.log(this.frontImageIndex);
    for(let i=0; i < this.activityImages.length; i++)
    {
      console.log(document.getElementById(i.toString()));
      // document.getElementById(i.toString()).classList.remove("selected");
    }
    document.getElementById(this.frontImageIndex.toString()).classList.add("selected");
    console.log(document.getElementById(this.frontImageIndex.toString()));

  }

}

function serverSideValidateCategoryName(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { nameAlreadyExists: true };
      })
    );
  };
}
