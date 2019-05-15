import { Injectable, Output, EventEmitter } from "@angular/core";
import {
  HttpClient,
  HttpEventType,
  JsonpClientBackend
} from "@angular/common/http";
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

  getCategory(name: string): Observable<Category> {
    return this.http
      .get(`${environment.apiUrl}/Activity/Category/${name}`)
      .pipe(map((json: any): Category => Category.fromJson(json)));
  }

  getActivity(id: string): Observable<Activity> {
    return this.http
      .get(`${environment.apiUrl}/Activity/${id}`)
      .pipe(map((json: any): Activity => Activity.fromJSON(json)));
  }

  updateCategory(id: number, name: string, url: string) {
    return this.http.post(`${environment.apiUrl}/Activity/Category/updateCategory`, {
      CategoryId: id,
      name,
      image: {url}
    });
  }

  updateActivity(id: number, name: string, description: string, category: Category, start: Date, end: Date, frontImage: string, images: string[]) {
    let imagesjson: any[] = [];
    images.map(url => {
      imagesjson.push({ url });
    });
    let jsonBody = {
      activityId : id,
      name,
      description,
      category: { categoryId: category.id },
      start,
      end,
      frontImage: { url: frontImage },
      images: imagesjson
    };
    return this.http.post(`${environment.apiUrl}/Activity/updateActivity`, jsonBody);
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

  addActivity(
    name: string,
    description: string,
    start: Date,
    end: Date,
    categoryName: string,
    url: string,
    images: string[]
  ) {
    let imagesjson: any[] = [];
    images.map(url => {
      imagesjson.push({ url });
    });
    let jsonBody = {
      name,
      description,
      category: { name: categoryName },
      start,
      end,
      frontImage: { url },
      images: imagesjson
    };
    return this.http.post(`${environment.apiUrl}/Activity`, jsonBody, {
      responseType: "text"
    });
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
    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append("file" + index, file, file.name);
    });

    return this.http.post(`${environment.apiUrl}/Image/UploadImage`, formData);
  }

  public deleteCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}/Activity/Category/${id}`);
  }

  public deleteActivity(id: number) {
    return this.http.delete(`${environment.apiUrl}/Activity/${id}`);
  }
}
