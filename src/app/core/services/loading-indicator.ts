import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingIndicator {
  private loadingCount = 0;
  private _isLoading$ = new BehaviorSubject<boolean>(!!this.loadingCount);
  isLoading$ = this._isLoading$.asObservable();

  constructor() {}

  show() {
    this.loadingCount++;
    this._isLoading$.next(this.isLoading());
  }

  hide() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
      this._isLoading$.next(this.isLoading());
    }
  }

  isLoading(): boolean {
    return this.loadingCount > 0;
  }
}
