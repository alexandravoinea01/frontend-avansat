import {QuestionModel} from "./question.model";

export class SurveyModel {
  constructor(
    public title: string,
    public category: string,
    public description: string,
    public questions: QuestionModel[]
  ) {
  }
}
