import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    setHeaders: {
      'X-API-KEY': environment.apiKey || '',
    },
  });

  return next(reqClone);
};
