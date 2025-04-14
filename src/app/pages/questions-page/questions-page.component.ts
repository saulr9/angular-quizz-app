import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { QuestionnaireFormComponent } from '../../features/questionnaire/components/questionnaire-form/questionnaire-form.component';
import { QuestionnaireProgressComponent } from '../../features/questionnaire/components/questionnaire-progress/questionnaire-progress.component';
import { QuestionnaireResultComponent } from '../../features/questionnaire/components/questionnaire-result/questionnaire-result.component';
import { QuestionnaireService } from '../../features/questionnaire/services/questionnaire.service';
import { Questionnaire } from '../../shared/interfaces/questions';

@Component({
  selector: 'app-questions-page',
  imports: [
    NgIf,
    AsyncPipe,
    QuestionnaireProgressComponent,
    QuestionnaireFormComponent,
    QuestionnaireResultComponent,
    MatProgressSpinner,
  ],
  templateUrl: './questions-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full',
  },
})
export default class QuestionsPageComponent implements OnInit {
  public questionnaire = signal<Questionnaire | null>(null);
  private questionnaireService = inject(QuestionnaireService);

  public isCompleted$ = this.questionnaireService.isCompleted$;
  public isSubmitting$ = this.questionnaireService.isSubmitting$;
  ngOnInit(): void {
    this.questionnaireService.startQuestionnaire();
    this.questionnaire.set(this.questionnaireService.getState().questionnaire);
  }
}
