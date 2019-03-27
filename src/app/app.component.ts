import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from './activity.model';
import { ActivityDataService } from 'src/activity-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fonkelster';
  private _fetchActivities$: Observable<Activity[]> = this._activityDataService.activities$

  constructor(private _activityDataService: ActivityDataService) {}

  get activities$(): Observable<Activity[]>{
    return this._fetchActivities$;
  }
  
}
