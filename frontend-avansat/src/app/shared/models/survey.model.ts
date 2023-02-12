import {QuestionModel} from "./question.model";

export class SurveyModel {
  constructor(
    public id: string,
    public title: string,
    public category: string,
    public description: string,
    public questions: QuestionModel[],
    public createdBy: string,
    public respondents: string[] = []
  ) {
  }
}
