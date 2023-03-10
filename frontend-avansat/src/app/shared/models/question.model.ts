export class QuestionModel {
  constructor(
    public text: string = '',
    public answers: AnswerModel[]
  ) {
  }
}

export class AnswerModel {
  constructor(
    public text: string = '',
    public chosen: boolean = false,
    public count: number = 0
  ) {
  }
}
