import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { LocalStorageService } from './local-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IStatusResponse } from '../interfaces/status.interface';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],

    });
    service = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar a key se estiver logado', () => {
    const localStorageservice = TestBed.inject(LocalStorageService);
    spyOn(localStorageservice, 'obterValor').and.returnValue('valor-key');
    let key = service.estaLogado();

    expect(key).toBe('valor-key');
  });

  it('Deve realizar o logout do usuário e retirar a key do local storage', () => {
    const localStorageservice = TestBed.inject(LocalStorageService);

    let spied = spyOn(localStorageservice, 'removerValor').and.callThrough();
    service.logout();

    expect(spied).toHaveBeenCalledWith('api-key');
  });

  it('Deve realizar o login de usuário e salvar a key do local storage se válido, e redirecionar para home', () => {

    let response: IStatusResponse = {
      get: '',
      parameters: undefined,
      errors: undefined,
      results: 0,
      paging: {
        current: undefined,
        total: undefined
      },
      response: {
        subscription: {
          plan: 'string',
          end: 'string',
          active: true,
        }
      }
    }

    let emmiter = new EventEmitter<boolean>();
    let spiedEmmiter = spyOn(emmiter, 'emit');

    const localStorageservice = TestBed.inject(LocalStorageService);

    let spiedLocalStorage = spyOn(localStorageservice, 'setarValor').and.callThrough();
    spyOn(service, 'verificaStatus').and.returnValue(of(response));
    let spiedRouter = spyOn(router, 'navigate');
    
    service.login('key', emmiter);

    expect(spiedLocalStorage).toHaveBeenCalledWith('api-key', 'key');
    expect(spiedRouter).toHaveBeenCalledWith(['/']);
    expect(spiedEmmiter).toHaveBeenCalledWith(true);
  });

  it('Deve emitir um falso para caso tenha algum erro no retorno da requisição e não deve salvar nenhuma key', () => {

    let response: IStatusResponse = {
      get: '',
      parameters: undefined,
      errors: [{erro: 'erro'}],
      results: 0,
      paging: {
        current: undefined,
        total: undefined
      }
    }

    let emmiter = new EventEmitter<boolean>();
    let spiedEmmiter = spyOn(emmiter, 'emit');

    const localStorageservice = TestBed.inject(LocalStorageService);

    let spiedLocalStorage = spyOn(localStorageservice, 'setarValor').and.callThrough().calls.count();
    spyOn(service, 'verificaStatus').and.returnValue(of(response));
    let spiedRouter = spyOn(router, 'navigate').calls.count();
    
    service.login('key', emmiter);


    expect(spiedLocalStorage).toBe(0);
    expect(spiedRouter).toBe(0);
    expect(spiedEmmiter).toHaveBeenCalledWith(false);
  });

  it('Deve emitir um falso para caso a key passada não esteja ativa', () => {

    let response: IStatusResponse = {
      get: '',
      parameters: undefined,
      errors: [{erro: 'erro'}],
      results: 0,
      paging: {
        current: undefined,
        total: undefined
      },
      response: {
        subscription: {
          plan: 'string',
          end: 'string',
          active: false,
        }
      }
    }

    let emmiter = new EventEmitter<boolean>();
    let spiedEmmiter = spyOn(emmiter, 'emit');

    const localStorageservice = TestBed.inject(LocalStorageService);

    let spiedLocalStorage = spyOn(localStorageservice, 'setarValor').and.callThrough().calls.count();
    spyOn(service, 'verificaStatus').and.returnValue(of(response));
    let spiedRouter = spyOn(router, 'navigate').calls.count();
    
    service.login('key', emmiter);


    expect(spiedLocalStorage).toBe(0);
    expect(spiedRouter).toBe(0);
    expect(spiedEmmiter).toHaveBeenCalledWith(false);
  });

  it('Deve fazer requisição para verificar se o status da key está ativo', () => {

    let http: HttpClient = TestBed.inject(HttpClient);
    let spied = spyOn(http, 'get');

    let headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', 'key');

    service.verificaStatus('key');
    expect(spied).toHaveBeenCalledWith('https://v3.football.api-sports.io/status', {headers});
  });
});
