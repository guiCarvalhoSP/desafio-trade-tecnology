import { Component } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private footballService: FootballService) {
    // this.obterListaDePaises();
  };

  obterListaDePaises() {
    let paises = this.footballService.listarPaises().subscribe({
      error: (err) =>  {
        console.log(err);
      }
    });

  }

}
