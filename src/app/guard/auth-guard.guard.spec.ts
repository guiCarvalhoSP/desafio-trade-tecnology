import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth-guard.guard';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';

describe('AuthGuard', () => {
  const mockRouter = jasmine.createSpyObj<Router>(['navigate']);
  mockRouter.navigate.and.returnValue(lastValueFrom(of(true)));

  const setup = (loginServiceMock: unknown) => {
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    });

    return TestBed.runInInjectionContext(authGuard);
  };

  it('Deve retornar true se estiver com usuario logado', () => {
    const mockLoginService = {
      estaLogado: () => true,
    };
    const guard = setup(mockLoginService);

    expect(guard).toBe(true);
  });

  it('Deve navegar para rota de /login caso usuario não esteja logado', async () => {
    const mockLoginService: unknown = {
      estaLogado: () => false,
    };

    await setup(mockLoginService);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

});
