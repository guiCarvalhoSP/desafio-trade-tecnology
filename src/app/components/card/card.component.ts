import { Component, Input, OnInit } from '@angular/core';

import { IPlayers } from 'src/app/interfaces/player.interface';
import { ITeamStatics } from 'src/app/interfaces/team.interfaces';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input()
  estatisticasTime: ITeamStatics | any;

  listaJogadores: IPlayers | any;

  formaMaisUtilizada: string = '';
  data: number[] = [];
  isLoading: boolean = false;

  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.buscaListaDeJogadores();
    this.verificaFormacaoUtilizada();
    this.data = this.obterDadosParaGrafico();
  }

  ngOnChanges(): void {
    this.buscaListaDeJogadores();
    this.data = this.obterDadosParaGrafico();
  }

  verificaFormacaoUtilizada() {
    let qtd: number = 0;

    this.estatisticasTime.response.lineups.forEach(
      (formacao: { played: number; formation: string }) => {
        if (formacao.played > qtd) {
          qtd = formacao.played;
          this.formaMaisUtilizada = formacao.formation;
        }
      }
    );
  }

  buscaListaDeJogadores() {
    this.isLoading = true;

    let timeId = this.estatisticasTime.response.team.id;
    let ligaId = this.estatisticasTime.response.league.id;
    let temporada = this.estatisticasTime.response.league.season;

    this.footballService
      .listarJogadoresDoTime(timeId, ligaId, temporada)
      .subscribe({
        next: (jogadores) => {
          if (jogadores.constructor.name != 'IMessage') {
            this.listaJogadores = jogadores;
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => (this.isLoading = false),
      });
  }

  obterDadosParaGrafico() {
    let data: number[] = [];

    let golsArr = Object.values(
      this.estatisticasTime.response.goals.for.minute
    );

    golsArr.forEach((gols: any) => {
      if (gols.total) {
        data.push(gols.total);
      } else {
        data.push(0);
      }
    });

    return data;
  }
}
