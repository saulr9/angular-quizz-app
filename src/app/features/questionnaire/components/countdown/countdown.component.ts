import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  CountdownComponent,
  CountdownEvent,
  CountdownModule,
} from 'ngx-countdown';
import {
  CountdownState,
  QuestionnaireCountdownService,
} from '../../services/questionnaire-countdown.service';

@Component({
  selector: 'app-questionnaire-countdown',
  imports: [CountdownModule, MatIcon],
  templateUrl: './countdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireCountDownComponent {
  @Input() timeLimitInMinutes: number = 10;
  timeLimitInSeconds!: number;

  private countdownService = inject(QuestionnaireCountdownService);
  @ViewChild('cd', { static: true })
  countdown!: CountdownComponent;

  ngOnInit(): void {
    this.timeLimitInSeconds = this.timeLimitInMinutes * 60;
    this.countdownService.countdownState$.subscribe((countdownState) => {
      switch (countdownState) {
        case CountdownState.STOPPED:
          this.countdown.stop();
          break;
        case CountdownState.RESTARTED:
          this.countdown.restart();
          break;
      }
    });
  }

  onCountdownEvent(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.countdownService.notifyCountdownFinished();
    }
  }
}
