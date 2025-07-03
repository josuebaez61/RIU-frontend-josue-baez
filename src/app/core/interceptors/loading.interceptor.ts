import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingIndicator } from '../services/loading-indicator';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingIndicator = inject(LoadingIndicator);
  loadingIndicator.show();

  return next(req).pipe(
    finalize(() => {
      loadingIndicator.hide();
    })
  );
};
