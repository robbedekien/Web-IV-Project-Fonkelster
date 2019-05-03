import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from './models/activity.model';
import { ActivityDataService } from 'src/app/activity/activity-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fonkelster';
  private _fetchActivities$: Observable<Activity[]> = this._activityDataService.activities$

  constructor(private _activityDataService: ActivityDataService) {}

  ngOnInit(){
    
  }
}
