import { QuestionType } from '../enums/question-type';
import {
  QuestionnaireCorrectAnswers,
  QuestionWithOptions,
} from '../interfaces/questions';

export function questions(): QuestionWithOptions[] {
  return [
    {
      id: 1,
      title: 'What is Angular?',
      description: 'A question about Angular framework basics.',
      createdAt: '2025-04-01T10:00:00Z',
      updatedAt: '2025-04-01T12:00:00Z',
      tags: ['Angular', 'JavaScript', 'Frontend'],
      isEnabled: true,
      isMultipleChoice: true,
      correctAnswerCount: 1,
      type: QuestionType.SingleChoice,
      options: [
        {
          id: 101,
          questionId: 1,
          text: 'A backend framework',

          createdAt: '2025-04-01T10:05:00Z',
          updatedAt: '2025-04-01T10:05:00Z',
        },
        {
          id: 102,
          questionId: 1,
          text: 'A frontend framework',

          createdAt: '2025-04-01T10:05:00Z',
          updatedAt: '2025-04-01T10:05:00Z',
        },
        {
          id: 103,
          questionId: 1,
          text: 'A database',

          createdAt: '2025-04-01T10:05:00Z',
          updatedAt: '2025-04-01T10:05:00Z',
        },
      ],
    },
    {
      id: 2,
      title: 'Which languages are used in Angular development?',
      description: 'Select all languages commonly used in Angular.',
      createdAt: '2025-04-02T09:00:00Z',
      updatedAt: '2025-04-02T09:30:00Z',
      tags: ['Angular', 'Languages', 'Frontend'],
      isEnabled: true,
      isMultipleChoice: true,
      correctAnswerCount: 3,
      type: QuestionType.MultipleChoice,
      options: [
        {
          id: 104,
          questionId: 2,
          text: 'TypeScript',

          createdAt: '2025-04-02T09:05:00Z',
          updatedAt: '2025-04-02T09:05:00Z',
        },
        {
          id: 105,
          questionId: 2,
          text: 'JavaScript',

          createdAt: '2025-04-02T09:05:00Z',
          updatedAt: '2025-04-02T09:05:00Z',
        },
        {
          id: 106,
          questionId: 2,
          text: 'Python',

          createdAt: '2025-04-02T09:05:00Z',
          updatedAt: '2025-04-02T09:05:00Z',
        },
        {
          id: 107,
          questionId: 2,
          text: 'HTML',
          createdAt: '2025-04-02T09:05:00Z',
          updatedAt: '2025-04-02T09:05:00Z',
        },
      ],
    },
    {
      id: 3,
      title: 'What is TypeScript?',
      description: 'A question about TypeScript basics.',
      createdAt: '2025-04-03T08:00:00Z',
      updatedAt: '2025-04-03T08:30:00Z',
      tags: ['TypeScript', 'JavaScript', 'Frontend'],
      isEnabled: true,
      isMultipleChoice: false,
      correctAnswerCount: 1,
      type: QuestionType.SingleChoice,
      options: [
        {
          id: 108,
          questionId: 3,
          text: 'A superset of JavaScript',
          /* isCorrect: true, */
          createdAt: '2025-04-03T08:05:00Z',
          updatedAt: '2025-04-03T08:05:00Z',
        },
        {
          id: 109,
          questionId: 3,
          text: 'A CSS framework',
          /* isCorrect: false, */
          createdAt: '2025-04-03T08:05:00Z',
          updatedAt: '2025-04-03T08:05:00Z',
        },
        {
          id: 110,
          questionId: 3,
          text: 'A database query language',
          /* isCorrect: false, */
          createdAt: '2025-04-03T08:05:00Z',
          updatedAt: '2025-04-03T08:05:00Z',
        },
      ],
    },
    {
      id: 4,
      title: 'What does HTML stand for?',
      description: 'A question about HTML basics.',
      createdAt: '2025-04-03T09:00:00Z',
      updatedAt: '2025-04-03T09:30:00Z',
      tags: ['HTML', 'Markup', 'Frontend'],
      isEnabled: true,
      isMultipleChoice: false,
      correctAnswerCount: 1,
      type: QuestionType.SingleChoice,
      options: [
        {
          id: 111,
          questionId: 4,
          text: 'HyperText Markup Language',
          /* isCorrect: true, */
          createdAt: '2025-04-03T09:05:00Z',
          updatedAt: '2025-04-03T09:05:00Z',
        },
        {
          id: 112,
          questionId: 4,
          text: 'HyperText Markdown Language',
          /* isCorrect: false, */
          createdAt: '2025-04-03T09:05:00Z',
          updatedAt: '2025-04-03T09:05:00Z',
        },
        {
          id: 113,
          questionId: 4,
          text: 'Hyperlink and Text Markup Language',
          /* isCorrect: false, */
          createdAt: '2025-04-03T09:05:00Z',
          updatedAt: '2025-04-03T09:05:00Z',
        },
      ],
    },
    {
      id: 5,
      title: 'Which of the following is a CSS framework?',
      description: 'Select the correct CSS framework.',
      createdAt: '2025-04-03T10:00:00Z',
      updatedAt: '2025-04-03T10:30:00Z',
      tags: ['CSS', 'Framework', 'Frontend'],
      isEnabled: true,
      isMultipleChoice: true,
      correctAnswerCount: 1,
      type: QuestionType.SingleChoice,
      options: [
        {
          id: 114,
          questionId: 4,
          text: 'Bootstrap',
          /* isCorrect: true, */
          createdAt: '2025-04-03T10:05:00Z',
          updatedAt: '2025-04-03T10:05:00Z',
        },
        {
          id: 114,
          questionId: 4,
          text: 'Angular',
          /* isCorrect: false, */
          createdAt: '2025-04-03T10:05:00Z',
          updatedAt: '2025-04-03T10:05:00Z',
        },
        {
          id: 115,
          questionId: 4,
          text: 'React',
          /* isCorrect: false, */
          createdAt: '2025-04-03T10:05:00Z',
          updatedAt: '2025-04-03T10:05:00Z',
        },
      ],
    },
  ];
}

export function questionnaireCorrectAnswers(): QuestionnaireCorrectAnswers {
  return {
    questionnaireId: 1,
    answers: [
      {
        questionId: 1,
        correctAnswerIds: [102],
      },
      {
        questionId: 2,
        correctAnswerIds: [104, 105, 107],
      },
      {
        questionId: 3,
        correctAnswerIds: [108],
      },
      {
        questionId: 4,
        correctAnswerIds: [111],
      },
      {
        questionId: 5,
        correctAnswerIds: [114],
      },
    ],
  };
}
