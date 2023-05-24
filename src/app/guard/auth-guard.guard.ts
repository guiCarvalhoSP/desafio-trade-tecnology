import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

export const authGuard = () => {
  const router = inject(Router);
  const service = inject(LoginService);

  return service.estaLogado() ? true : router.navigate(['/login']);
}
