import {Component, Input, OnInit} from '@angular/core';
import {SurveyModel} from "../../models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey-card',
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.scss']
})
export class SurveyCardComponent implements OnInit {

  @Input() survey!: SurveyModel;
  @Input() hideButton = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  takeSurvey() {
    this.router.navigate(['surveys', this.survey.id, 'take-survey']);
  }
}
