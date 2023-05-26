import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve setar um valor no local storage', () => {
    let spy = spyOn(localStorage, 'setItem').and.callThrough();
    service.setarValor('chave', 'valor');
    expect(spy).toHaveBeenCalledWith('chave' , 'valor');
  });

  it('Deve obter algum valor do local storage', () => {
    let spy = spyOn(localStorage, 'getItem').and.returnValue('valor');
    
    expect(service.obterValor('chave')).toBe('valor');
    expect(spy).toHaveBeenCalledWith('chave');
  });

  it('Deve remover um valor do local storage', () => {
    let spy = spyOn(localStorage, 'removeItem').and.callThrough();
    service.removerValor('chave');
    expect(spy).toHaveBeenCalledWith('chave');

  });
});
