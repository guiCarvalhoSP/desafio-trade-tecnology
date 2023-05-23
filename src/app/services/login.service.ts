import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IStatusResponse } from '../interfaces/status.interface';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly url: string = environment.apiUrl;
  readonly parametroKey: string = 'api-key';

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
  ) {}

  async login(key: string) {
    let loginEfetuado: boolean = false;
    await (await this.verificaStatus(key)).subscribe(
      {next: (res) => {
          loginEfetuado = this.salvarKey(res, key);
        },
        error: (err) => {
          console.log(err)
          loginEfetuado = false;
        }
      }
    );
    
    return loginEfetuado;
  }

  estaLogado(): boolean {
    let key = this.storageService.obterValor(this.parametroKey);

    if(key) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.storageService.removerValor(this.parametroKey);
    console.log('Logout efetuado.');
  }

  private salvarKey (response: IStatusResponse, key: string): boolean {
      if(response.response.subscription.active) {
        this.storageService.setarValor(this.parametroKey, key);
        return true;
      } else {
        console.log('Não foi possível realizar login');
        return false;
      }
  }

  private async verificaStatus(key: string) {
    let headers = new HttpHeaders()
      .set('x-rapidapi-host', 'v3.football.api-sports.io')
      .set('x-rapidapi-key', key);
    return this.http.get<IStatusResponse>(`${this.url}/status`, { headers: headers,});
  }
}
