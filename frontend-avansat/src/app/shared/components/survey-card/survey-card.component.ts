import {Component, Input, OnInit} from '@angular/core';
import {SurveyModel} from "../../models";

@Component({
  selector: 'app-survey-card',
  templateUrl: './survey-card.component.html',
  styleUrls: ['./survey-card.component.scss']
})
export class SurveyCardComponent implements OnInit {

  @Input() survey!: SurveyModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  takeSurvey() {
    console.log()
  }
}
