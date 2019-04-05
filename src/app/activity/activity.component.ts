import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  @Input() public activity : Activity;
  constructor() { }

  ngOnInit() {
  }

}
