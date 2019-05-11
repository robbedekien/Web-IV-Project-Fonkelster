import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Activity } from "../models/activity.model";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root"
})
export class ActivityDataService {
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {}

  get activities$(): Observable<Activity[]> {
    return this.http
      .get(`${environment.apiUrl}/Activity`)
      .pipe(map((list: any[]): Activity[] => list.map(Activity.fromJSON)));
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get(`${environment.apiUrl}/Activity/Category`)
      .pipe(map((list: any[]): Category[] => list.map(Category.fromJson)));
  }

  checkCategoryNameAvailability = (name: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/activity/checkcategoryname`,
      {
        params: { name }
      }
    );
  };

  addCategory(name: string, url: string) {
    return this.http.post(
      `${environment.apiUrl}/Activity/Category`,
      {
        name,
        image: { url }
      },
      { responseType: "text" }
    );
  }

  register(email: string, id: Number) {
    return this.http
      .post(`${environment.apiUrl}/Activity/${id}/Register/${email}`, {
        id,
        email
      })
      .subscribe(value => {});
  }

  unsubscribe(email: string, id: Number) {
    return this.http.post(
      `${environment.apiUrl}/Activity/${id}/Unsubscribe/${email}`,
      { id, email }
    );
  }

  checkRegistered(email: string, id: Number) {
    return this.http.get<boolean>(
      `${environment.apiUrl}/activity/${id}/isRegistered/${email}`
    );
  }

  public uploadFile(files): Observable<any> {
    if (files.length === 0) {
      return;
    }
    let filesToUpload : File[] = files;
    const formData = new FormData();
    
    console.log(Array.from(filesToUpload));
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file'+index, file, file.name);
    });        
    
    return this.http.post(`${environment.apiUrl}/Image/UploadImage`, formData);
  };
}
