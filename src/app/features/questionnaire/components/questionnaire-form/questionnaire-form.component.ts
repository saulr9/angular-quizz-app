import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QuestionType } from '../../../../shared/enums/question-type';
import {
  QuestionnaireAnswers,
  QuestionWithOptions,
} from '../../../../shared/interfaces/questions';
import { FormStepService } from '../../services/form-step.service';
import {
  CountdownState,
  QuestionnaireCountdownService,
} from '../../services/questionnaire-countdown.service';
import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire-form',
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    AsyncPipe,
  ],

  templateUrl: './questionnaire-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-full ',
  },
})
export class QuestionnaireFormComponent implements OnInit {
  public questions = input.required<QuestionWithOptions[]>();
  public isNextButtonDisabled = signal(true);
  questionnaireForm: FormGroup;

  private stepService = inject(FormStepService);
  private questionnaireService = inject(QuestionnaireService);

  private countdownService = inject(QuestionnaireCountdownService);

  isSubmitting$ = this.questionnaireService.isSubmitting$;
  isCompleted$ = this.questionnaireService.isCompleted$;

  constructor(private fb: FormBuilder) {
    this.questionnaireForm = this.fb.group({
      answers: this.fb.array([]),
    });
  }

  get answers(): FormArray {
    return this.questionnaireForm.get('answers') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();

    this.currentStep$.subscribe((currentStepIndex) => {
      const currentFormGroup = this.answers.at(currentStepIndex) as FormGroup;

      if (currentFormGroup) {
        this.isNextButtonDisabled.set(currentFormGroup.invalid);
        currentFormGroup.valueChanges.subscribe(() => {
          this.isNextButtonDisabled.set(currentFormGroup.invalid);
        });
      }
    });

    this.isSubmitting$.subscribe((isSubmitting) => {
      if (isSubmitting) this.questionnaireForm.disable();
    });

    this.isCompleted$.subscribe((isCompleted) => {
      if (isCompleted) {
        this.questionnaireForm.disable();
        return;
      }

      this.questionnaireForm.enable();
      this.questionnaireForm.reset();
    });

    this.countdownService.countdownState$.subscribe((countdownState) => {
      if (countdownState === CountdownState.FINISHED) {
        this.questionnaireForm.disable();
        this.onSubmit();
      }
    });
  }

  get currentStep$() {
    return this.stepService.currentStep$;
  }

  nextStep(): void {
    const currentStepIndex = this.stepService.getCurrentStep();
    const currentFormGroup = this.answers.at(currentStepIndex) as FormGroup;

    if (currentFormGroup.invalid) {
      return;
    }

    this.stepService.nextStep(this.questions().length);

    const nextStepIndex = this.stepService.getCurrentStep();
    const nextFormGroup = this.answers.at(nextStepIndex) as FormGroup;
    this.isNextButtonDisabled.set(nextFormGroup.invalid);
  }

  previousStep(): void {
    this.stepService.previousStep();

    const previousStepIndex = this.stepService.getCurrentStep();
    const previousFormGroup = this.answers.at(previousStepIndex) as FormGroup;
    this.isNextButtonDisabled.set(previousFormGroup.invalid);
  }

  async onSubmit(): Promise<void> {
    if (this.questionnaireForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formattedAnswers = this.formatAnswers();
    await this.questionnaireService.completeQuestionnaire(formattedAnswers);
  }

  private formatAnswers(): QuestionnaireAnswers {
    const questionnaireId = this.questionnaireService.getQuestionnaire().id;

    const answers = this.answers.controls.map((control, index) => {
      const formGroup = control as FormGroup;
      const question = this.questions()[index];

      const selectedOptionIds =
        question.type === 'single-choice'
          ? [formGroup.get('selectedOptionIds')?.value]
          : formGroup
              .get('selectedOptionIds')
              ?.value.map((isSelected: boolean, i: number) =>
                isSelected ? question.options[i].id : null
              )
              .filter((id: number | null) => id !== null);

      return {
        questionId: question.id,
        selectedOptionIds: selectedOptionIds || null,
      };
    });

    return {
      questionnaireId,
      answers,
    };
  }

  private initForm(): void {
    const answersArray = this.questionnaireForm.get('answers') as FormArray;

    this.questions().forEach((question) => {
      const questionGroup = this.createQuestionGroup(question);
      answersArray.push(questionGroup);
    });
  }

  private createQuestionGroup(question: QuestionWithOptions): FormGroup {
    if (question.type === QuestionType.SingleChoice) {
      return this.fb.group({
        questionId: [question.id],
        selectedOptionIds: [null, Validators.required],
      });
    }
    return this.fb.group({
      questionId: [question.id],
      selectedOptionIds: this.fb.array(
        question.options.map(() => this.fb.control(false)),
        this.atLeastOneSelectedValidator()
      ),
    });
  }
  private atLeastOneSelectedValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!(control instanceof FormArray)) {
        return null;
      }

      const isAtLeastOneSelected = control.controls.some(
        (ctrl) => ctrl.value === true
      );
      return isAtLeastOneSelected ? null : { atLeastOneRequired: true };
    };
  }
}
