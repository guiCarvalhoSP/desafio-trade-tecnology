import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  readonly url: string = environment.apiUrl;
  // Will be change after te creation of authentication
  readonly key: string = environment.key;
  readonly headers = new HttpHeaders()
    .set('x-rapidapi-host', 'v3.football.api-sports.io')
    .set('x-rapidapi-key', this.key);

  constructor(private http: HttpClient) { 
  }

  listarPaises() {
    return this.http.get(`${this.url}/countries`, {headers: this.headers});
  }
}
