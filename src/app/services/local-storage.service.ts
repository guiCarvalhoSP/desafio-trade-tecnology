import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setarValor(key: string, dado: string): void {
    localStorage.setItem(key, dado);
  }

  obterValor(key: string): string | null {
    return localStorage.getItem(key);
  }

  removerValor(key: string): void {
    localStorage.removeItem(key);
  }
}
