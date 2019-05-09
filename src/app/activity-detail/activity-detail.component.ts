import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../user/authentication.service';
import { ActivityDataService } from '../activity/activity-data.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  activity: Activity;
  p: number = 1;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router, private activityService : ActivityDataService) { }

  ngOnInit() {
    if (localStorage.getItem("Activities") !== null) {
      this.route.paramMap.subscribe(pa => {
        this.activity = JSON.parse(localStorage.getItem("Activities")).filter(a =>
          a.id == pa.get("activityId")
        )[0];
      });
    }

    console.log(this.activity);

  }

  register() {
    if (this.authService.user$.value === null) {
      this.router.navigate(["/register"]);
    } else {
      this.activityService.register(this.authService.user$.value, this.activity.id);
    }
  }

}
