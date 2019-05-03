import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  activity : Activity;
  p: number = 1;

  constructor(private route : ActivatedRoute) { }

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
}
