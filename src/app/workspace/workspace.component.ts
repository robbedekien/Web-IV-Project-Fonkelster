import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  public imagePrefix : string;

  constructor() { }

  ngOnInit() {
    this.imagePrefix = environment.imagePrefix;
  }

}
