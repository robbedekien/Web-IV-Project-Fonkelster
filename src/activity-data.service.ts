import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './environments/environment';
import { Activity } from './app/activity.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

  constructor(private http : HttpClient) { }
  
  get activities$(): Observable<Activity[]> {
    return this.http.get(`${environment.apiUrl}/Activity`).pipe(
      map(
        (list : any[]): Activity[] => list.map(Activity.fromJSON)
      ))
  }
}
