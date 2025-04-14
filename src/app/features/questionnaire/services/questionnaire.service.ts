import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { questionnaire } from '../../../shared/data/questionnaire';
import { questionnaireCorrectAnswers } from '../../../shared/data/questions';
import {
  Questionnaire,
  QuestionnaireAnswers,
  QuestionnaireCorrectAnswers,
  QuestionnaireResult,
} from '../../../shared/interfaces/questions';
import { sleep } from '../../../shared/utils/sleep';
import { FormStepService } from './form-step.service';
import {
  CountdownState,
  QuestionnaireCountdownService,
} from './questionnaire-countdown.service';

interface QuestionnaireState {
  questionnaire: Questionnaire;
  isCompleted: boolean;
  isSubmitting: boolean;
  startTime: number | null;
  endTime: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private stateSubject = new BehaviorSubject<QuestionnaireState>({
    questionnaire: questionnaire(),
    isCompleted: false,
    isSubmitting: false,
    startTime: null,
    endTime: null,
  });
  private stepService = inject(FormStepService);
  private questionnaireCountdownService = inject(QuestionnaireCountdownService);
  private resultSubject = new BehaviorSubject<QuestionnaireResult | null>(null);

  result$ = this.resultSubject.asObservable();

  state$ = this.stateSubject.asObservable();

  isCompleted$ = this.state$.pipe(map((state) => state.isCompleted));
  isSubmitting$ = this.state$.pipe(map((state) => state.isSubmitting));

  constructor() {}

  getState(): QuestionnaireState {
    return this.stateSubject.value;
  }

  updateState(partialState: Partial<QuestionnaireState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...partialState,
    });
  }

  startQuestionnaire(): void {
    this.questionnaireInitState();
    this.questionnaireCountdownService.setCountdownState(
      CountdownState.STARTED
    );
  }

  async completeQuestionnaire(
    data: QuestionnaireAnswers
  ): Promise<QuestionnaireResult> {
    this.updateState({ isSubmitting: true, endTime: Date.now() });

    const result = await this.getQuestionnaireResult(data);
    this.resultSubject.next(result);
    this.updateState({ isCompleted: true, isSubmitting: false });
    this.questionnaireCountdownService.setCountdownState(
      CountdownState.STOPPED
    );

    return result;
  }

  resetQuestionnaire(): void {
    this.questionnaireInitState();
    this.resultSubject.next(null);
    this.stepService.resetStep();
    this.questionnaireCountdownService.setCountdownState(
      CountdownState.RESTARTED
    );
  }

  getTimeTaken(): number | null {
    const { startTime, endTime } = this.getState();
    return startTime && endTime ? endTime - startTime : null;
  }

  getQuestionnaire(): Questionnaire {
    return this.getState().questionnaire;
  }

  getQuestionnaireCorrectAnswers(): QuestionnaireCorrectAnswers {
    return questionnaireCorrectAnswers();
  }

  async getQuestionnaireResult(
    answers: QuestionnaireAnswers
  ): Promise<QuestionnaireResult> {
    const { questionnaire } = this.getState();
    const correctAnswers = this.getQuestionnaireCorrectAnswers();

    await sleep(1000);
    const isPassed = this.calculatePassStatus(answers, correctAnswers);
    const timeTaken = this.getTimeTaken();
    const score = this.calculateScore(answers, correctAnswers);
    const messageTitle = isPassed
      ? 'Congratulations!!!'
      : 'Unfortunately, you did not pass the questionnaire.';

    const messageBody = isPassed
      ? 'You have passed the questionnaire successfully.'
      : 'You can try again. Good luck!';
    return {
      isPassed,
      score,
      timeTaken: timeTaken,
      questionnaireId: questionnaire.id,
      messageTitle,
      messageBody,
    };
  }

  private calculatePassStatus(
    answers: QuestionnaireAnswers,
    correctAnswers: QuestionnaireCorrectAnswers
  ): boolean {
    const { percentageToPass } = this.getQuestionnaire();
    const score = this.calculateScore(answers, correctAnswers);
    return score >= percentageToPass;
  }

  private calculateScore(
    answers: QuestionnaireAnswers,
    correctAnswers: QuestionnaireCorrectAnswers
  ): number {
    const { answers: userAnswers } = answers;
    const { answers: correctAnswersList } = correctAnswers;
    const totalQuestions = userAnswers.length;

    const correctAnswersCount = userAnswers.reduce((acc, userAnswer) => {
      const correctAnswer = correctAnswersList.find(
        (answer) => answer.questionId === userAnswer.questionId
      );
      if (!correctAnswer) return acc;

      const userSelectedIds = Array.isArray(userAnswer.selectedOptionIds)
        ? userAnswer.selectedOptionIds
        : [userAnswer.selectedOptionIds];

      const correctAnswerIds = correctAnswer.correctAnswerIds;

      const matchedAnswersCount = userSelectedIds.filter((id) =>
        correctAnswerIds.includes(id)
      ).length;

      const matchPercentage =
        (matchedAnswersCount / correctAnswerIds.length) * 100;

      const isCorrect = matchPercentage >= 50;

      return isCorrect ? acc + 1 : acc;
    }, 0);

    const score = (correctAnswersCount / totalQuestions) * 100;
    return Math.round(score);
  }

  private questionnaireInitState(): QuestionnaireState {
    const initialState: QuestionnaireState = {
      ...this.getState(),
      startTime: Date.now(),
      isCompleted: false,
      endTime: null,
    };
    this.updateState(initialState);
    return initialState;
  }
}
