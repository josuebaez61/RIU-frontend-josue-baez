import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-no-data',
  imports: [CommonModule, MatProgressBarModule],
  template: `
    @if (loading) {
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    } @else if (empty) {
    <div class="no-data-message text-sm py-4">{{ message }}</div>
    }
  `,
  styles: ``,
})
export class NoData {
  @Input()
  loading = false;

  @Input()
  empty = false;

  @Input()
  message = 'No data available';
}
