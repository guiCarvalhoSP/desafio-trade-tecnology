import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit{

  @Input() labels: string[] = [];
  @Input() dataGraf: number[] = [];

  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Gols por periodo do jogo'},
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options']= {
    responsive: true,
    backgroundColor: '#876FE3',
  };

  constructor() {}

  ngOnInit() {
    this.barChartData = {
      labels: [...this.labels],
      datasets: [
        { data: [...this.dataGraf], label: 'Gols por periodo'},
      ]
    }
  }

  ngOnChanges() {
    this.barChartData = {
      labels: [...this.labels],
      datasets: [
        { data: [...this.dataGraf], label: 'Gols por periodo'},
      ]
    }
  }
}
