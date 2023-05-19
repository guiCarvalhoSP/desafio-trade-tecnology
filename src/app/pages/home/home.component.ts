import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ICountry } from 'src/app/interfaces/country.interface';
import { ILeagues } from 'src/app/interfaces/leagues.interface';
import { ITeams, ITeamStatics } from 'src/app/interfaces/team.interfaces';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  formulario: FormGroup;

  listaPaises: ICountry | any;
  listaLigas: ILeagues | any;
  listaTimes: ITeams | any;
  listaTemporada: string[] = [];
  estatisticasTime: ITeamStatics | any;

  constructor(
    private footballService: FootballService,
    formBuilder: FormBuilder
  ) {
    this.obterListaDePaises();

    this.formulario = formBuilder.group({
      pais: ['#'],
      temporada: ['#'],
      liga: ['#'],
      time: ['#'],
    });

    this.formulario.get('liga')?.disable;
    this.formulario.get('temporada')?.disable;
    this.formulario.get('time')?.disable;
  }

  async obterListaDePaises() {
    (await this.footballService.listarPaises()).subscribe({
      next: (paises) => {
        if (paises.constructor.name != 'IMessage') this.listaPaises = paises;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async obterListaDeLigas() {
    let pais = this.formulario.get('pais')?.value;

    if (pais != null && pais != '#') {
      this.formulario.get('liga')?.enable;
      this.formulario.get('temporada')?.disable;
      this.formulario.get('time')?.disable;

      (await this.footballService.listarLigas(pais)).subscribe({
        next: (ligas) => {
          if (ligas.constructor.name != 'IMessage') {
            this.listaLigas = ligas;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  async obterListaDeTimes() {
    let temporada = this.formulario.get('temporada')?.value;

    let ligaId = this.formulario.get('liga')?.value;

    if (temporada != null) {
      (
        await this.footballService.listarTimesDaLiga(ligaId, temporada)
      ).subscribe({
        next: (times) => {
          if (times.constructor.name != 'IMessage') {
            this.listaTimes = times;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  async obterEstatisticasTime() {
    let timeId = this.formulario.get('time')?.value;

    let ligaId = this.formulario.get('liga')?.value;

    let temporada = this.formulario.get('temporada')?.value;

    (
      await this.footballService.listarEstatiticasDoTime(
        ligaId,
        temporada,
        timeId
      )
    ).subscribe({
      next: (time) => {
        if (time.constructor.name != 'IMessage') {
          this.estatisticasTime = time;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    console.log(this.estatisticasTime);
  }

  listarTemporadas() {
    let ligaId = this.formulario.get('liga')?.value;

    let ligas: ILeagues = this.listaLigas;

    let temporadas = ligas.response
      .find((liga) => liga.league.id == ligaId)
      ?.seasons.map((season) => season.year.toString());

    if (temporadas) {
      this.listaTemporada = temporadas;
    }

    this.formulario.get('temporada')?.enable;
    this.formulario.get('time')?.disable;
  }
}
