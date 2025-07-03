import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { LoadingIndicator as LoadingIndicatorService } from '../../../core';

@Component({
  selector: 'app-loading-indicator',
  imports: [CommonModule, MatProgressBar],
  template: ` <div
    *ngIf="isLoading$ | async"
    class="loading-indicator fixed top-0 left-0 w-screen h-screen z-[9999]"
  >
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </div>`,
  styles: ``,
})
export class LoadingIndicator {
  isLoading$: Observable<boolean>;

  constructor(private readonly loadingIndicator: LoadingIndicatorService) {
    this.isLoading$ = this.loadingIndicator.isLoading$;
  }
}
