import { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    setHeaders: {
      'X-API-KEY': 'c2djFDFdmvc#$FdV%#!!$Df51d1s',
    },
  });

  return next(reqClone);
};
