import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum CountdownState {
  STARTED = 'started',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  FINISHED = 'finished',
  RESTARTED = 'restarted',
}

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireCountdownService {
  private countdownSubject = new BehaviorSubject<CountdownState>(
    CountdownState.STARTED
  );
  countdownState$ = this.countdownSubject.asObservable();

  notifyCountdownFinished(): void {
    this.countdownSubject.next(CountdownState.FINISHED);
  }

  setCountdownState(state: CountdownState): void {
    this.countdownSubject.next(state);
  }
}
