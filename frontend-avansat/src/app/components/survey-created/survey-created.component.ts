import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey-created',
  templateUrl: './survey-created.component.html',
  styleUrls: ['./survey-created.component.scss']
})
export class SurveyCreatedComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  createSurvey() {
    this.router.navigate(['profile', 'new-survey']);
  }
}
