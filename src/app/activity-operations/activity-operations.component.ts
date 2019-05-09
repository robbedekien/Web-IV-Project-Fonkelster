import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { ActivityDataService } from '../activity/activity-data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activity-operations',
  templateUrl: './activity-operations.component.html',
  styleUrls: ['./activity-operations.component.scss']
})
export class ActivityOperationsComponent implements OnInit {

  activity : FormGroup;
  category : FormGroup;
  
  constructor(
    private _fba : FormBuilder,
    private _fbc : FormBuilder,
    private _adapter : DateAdapter<any>,
    private _activityService : ActivityDataService,
    private router : Router
  ) { }

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
    this.adapter.getFirstDayOfWeek = () => { return 1; }
    this.activity = this.fba.group(
      {
        name: ["", [Validators.required], serverSideValidateCategoryName(this._activityService.checkCategoryNameAvailability)],
        description: ["", [Validators.required]],
        start: ["", [Validators.required]],
        end: ["", [Validators.required]]
      }
    );

    this.category = this.fbc.group({
      name: ["", [Validators.required], serverSideValidateCategoryName(this._activityService.checkCategoryNameAvailability)],
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

  public imagePath;
  imgURL: any;
  public message: string;
 
  preview() {
    if (this.category.value.image.files.length === 0)
      return;
 
    var mimeType = this.category.value.image.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = this.category.value.image.files;
    reader.readAsDataURL(this.category.value.image.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
    
  }

  removeImage()
  {
    this.imgURL = "";
  }

  addCategory()
  {
    this.activityService.addCategory(
      this.category.value.name,
      ("../../assets/images/" + this.category.value.image.fileNames)
    ).subscribe(val => {
      if (val) {
        this.router.navigate(["/home"]);
      }
    });
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
