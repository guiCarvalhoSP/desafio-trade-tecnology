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

  camposPreenchidos: boolean = false;
  isLoading: boolean = false;
  msg: string = '';

  constructor(
    private footballService: FootballService,
    formBuilder: FormBuilder
  ) {
    this.formulario = formBuilder.group({
      pais: ['#'],
      temporada: [{ value: '#', disabled: true }],
      liga: [{ value: '#', disabled: true }],
      time: [{ value: '#', disabled: true }],
    });

    this.obterListaDePaises();
  }

  obterListaDePaises() {
    this.camposPreenchidos = false;
    this.isLoading = true;
    this.footballService.listarPaises().subscribe({
      next: (paises) => {
        if (paises.constructor.name != 'IMessage') this.listaPaises = paises;
        else this.msg = 'Erro na API Football. Tente novamente mais tarde!';
      },
      error: (err) => {
        console.log(err);
        this.msg = 'Erro na aplicação. Tente novamente mais tarde!';
      },
      complete: () => (this.isLoading = false),
    });
  }

  obterListaDeLigas() {
    this.camposPreenchidos = false;
    this.isLoading = true;

    let pais = this.formulario.get('pais')?.value;

    if (pais != null && pais != '#') {
      this.desabilitarCampos('temporada', 'time');
      this.isLoading = true;
      this.footballService.listarLigas(pais).subscribe({
        next: (ligas) => {
          if (ligas.constructor.name != 'IMessage') {
            this.habilitarCampos('liga');
            this.listaLigas = ligas;
          } else this.msg = 'Erro na API Football. Tente novamente mais tarde!';
        },
        error: (err) => {
          console.log(err);
          this.msg = 'Erro na aplicação. Tente novamente mais tarde!';
        },
        complete: () => (this.isLoading = false),
      });
    }
  }

  obterListaDeTimes() {
    this.camposPreenchidos = false;
    this.isLoading = true;

    let temporada = this.formulario.get('temporada')?.value;
    let ligaId = this.formulario.get('liga')?.value;

    if (temporada != null) {
      this.footballService.listarTimesDaLiga(ligaId, temporada).subscribe({
        next: (times) => {
          if (times.constructor.name != 'IMessage') {
            this.habilitarCampos('time');
            this.listaTimes = times;
          } else this.msg = 'Erro na API Football. Tente novamente mais tarde!';
        },
        error: (err) => {
          console.log(err);
          this.msg = 'Erro na aplicação. Tente novamente mais tarde!';
        },
        complete: () => (this.isLoading = false),
      });
    }
  }

  onSubmit() {
    this.isLoading = true;

    let timeId = this.formulario.get('time')?.value;
    let ligaId = this.formulario.get('liga')?.value;
    let temporada = this.formulario.get('temporada')?.value;

    this.footballService
      .listarEstatiticasDoTime(ligaId, temporada, timeId)
      .subscribe({
        next: (time) => {
          if (time.constructor.name != 'IMessage') {
            this.estatisticasTime = time;
          } else this.msg = 'Erro na API Football. Tente novamente mais tarde!';
        },
        error: (err) => {
          console.log(err);
          this.msg = 'Erro na aplicação. Tente novamente mais tarde!';
        },
        complete: () => (this.isLoading = false),
      });
  }

  listarTemporadas() {
    this.camposPreenchidos = false;

    let ligaId = this.formulario.get('liga')?.value;
    let ligas: ILeagues = this.listaLigas;

    this.listaTemporada = this.footballService.listarTemporadas(ligas, ligaId);

    this.habilitarCampos('temporada');
    this.desabilitarCampos('time');
  }

  habilitarCampos(...campos: string[]) {
    campos.forEach((campo) => this.formulario.get(campo)?.enable());
  }

  desabilitarCampos(...campos: string[]) {
    campos.forEach((campo) => this.formulario.get(campo)?.disable());
  }
}
