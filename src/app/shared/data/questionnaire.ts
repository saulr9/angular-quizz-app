import { Questionnaire } from '../interfaces/questions';
import { questions } from './questions';

export function questionnaire(): Questionnaire {
  const questionsData = questions();
  return {
    id: 1,
    title: 'Angular Basics',
    description: 'A questionnaire on Angular framework basics.',
    createdAt: '2025-04-01T10:00:00Z',
    updatedAt: '2025-04-01T12:00:00Z',
    tags: ['Angular', 'JavaScript', 'Frontend'],
    timeLimitInMinutes: 1,
    questionCount: questionsData.length,
    questionsWithOptions: questionsData,
    percentageToPass: 70,
  };
}
