import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { IStatusResponse } from '../interfaces/status.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly url: string = environment.apiUrl;
  readonly parametroKey: string =  environment.key;

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private router: Router,
  ) {}

  async login(key: string, event: EventEmitter<boolean>) {
    (await this.verificaStatus(key)).subscribe({
      next: (res) => {
        if (res.errors.token) {
          event.emit(false);
        } else {
          event.emit(this.salvarKey(res, key));
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  estaLogado() {
    let key = this.storageService.obterValor(this.parametroKey);
    return key;
  }

  logout() {
    this.storageService.removerValor(this.parametroKey);
    console.log('Logout efetuado.');
  }

  private salvarKey(status: IStatusResponse, key: string): boolean {
      if (status.response?.subscription.active) {
        this.storageService.setarValor(this.parametroKey, key);
        this.router.navigate(['/']);
        return true;
      } else {
        console.log('Não foi possível realizar login');
        return false;
      }
  }

  private async verificaStatus(key: string) {
    let headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', String(key));
    return this.http.get<IStatusResponse>(`${this.url}/status`, {
      headers: headers,
    });
  }
}
