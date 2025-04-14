import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStepService {
  private currentStepSubject = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStepSubject.asObservable();
  formattedStep$ = this.currentStep$.pipe(map((step) => step + 1));

  constructor() {}

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  nextStep(maxSteps: number): void {
    const currentStep = this.currentStepSubject.value;

    if (currentStep < maxSteps - 1) {
      this.currentStepSubject.next(currentStep + 1);
    }
  }

  previousStep(): void {
    const currentStep = this.currentStepSubject.value;
    if (currentStep > 0) {
      this.currentStepSubject.next(currentStep - 1);
    }
  }

  setStep(step: number): void {
    this.currentStepSubject.next(step);
  }

  resetStep(): void {
    this.currentStepSubject.next(0);
  }
}
