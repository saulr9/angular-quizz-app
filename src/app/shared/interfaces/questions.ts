import { QuestionType } from '../enums/question-type';

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  timeLimitInMinutes: number; // in minutes
  questionCount: number;
  questionsWithOptions: QuestionWithOptions[];
  percentageToPass: number;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isEnabled: boolean;
  isMultipleChoice: boolean;
  correctAnswerCount: number;
  type: QuestionType;
}

export interface QuestionWithOptions extends Question {
  options: Omit<Option, 'isCorrect'>[];
}
export interface Option {
  id: number;
  questionId: number;
  text: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
}

export interface Answer {
  id: number;
  questionId: number;
  userId: number;
  selectedOptionIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestionnaireAnswers {
  questionnaireId: number;
  answers: {
    questionId: number;
    selectedOptionIds: number[] | number;
  }[];
}

export interface QuestionnaireCorrectAnswers {
  questionnaireId: number;
  answers: { questionId: number; correctAnswerIds: number[] }[];
}

export interface QuestionnaireResult {
  isPassed: boolean;
  score: number;
  timeTaken: number | null;
  questionnaireId: number;
  messageTitle: string;
  messageBody: string;
}
