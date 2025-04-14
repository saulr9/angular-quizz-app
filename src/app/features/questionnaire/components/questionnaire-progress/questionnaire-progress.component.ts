import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormStepService } from '../../services/form-step.service';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { QuestionnaireCountDownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-questionnaire-progress',
  imports: [NgIf, MatCardModule, AsyncPipe, QuestionnaireCountDownComponent],
  templateUrl: './questionnaire-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-full ',
  },
})
export class QuestionnaireProgressComponent implements OnInit {
  public questionnaireService = inject(QuestionnaireService);
  private stepService = inject(FormStepService);
  public totalQuestions =
    this.questionnaireService.getState().questionnaire.questionCount;

  public isCompleted$ = this.questionnaireService.isCompleted$;

  formattedStep$ = this.stepService.formattedStep$;

  ngOnInit(): void {}
}
