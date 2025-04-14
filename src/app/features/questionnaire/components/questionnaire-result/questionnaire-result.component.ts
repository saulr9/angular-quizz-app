import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import confetti from 'canvas-confetti';
import { QuestionnaireResult } from '../../../../shared/interfaces/questions';
import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire-result',
  imports: [MatIcon, MatButtonModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './questionnaire-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex ',
  },
  standalone: true,
})
export class QuestionnaireResultComponent implements AfterViewInit, OnInit {
  @ViewChild('confettiCanvas') confettiCanvas!: ElementRef<HTMLCanvasElement>;

  result = signal<QuestionnaireResult | null>(null);
  private confettiInstance!: confetti.CreateTypes;
  private questionnaireService = inject(QuestionnaireService);

  ngOnInit(): void {
    this.questionnaireService.result$.subscribe((result) => {
      this.result.set(result);
    });
  }

  ngAfterViewInit(): void {
    if (!this.result()?.isPassed) {
      return;
    }
    this.confettiInstance = confetti.create(this.confettiCanvas.nativeElement, {
      resize: true,
      useWorker: true,
    });

    this.launchConfetti();
  }

  launchConfetti(): void {
    this.confettiInstance({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
