import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoComponent } from './grafico.component';
import { NgChartsModule } from 'ng2-charts';

describe('GraficoComponent', () => {
  let component: GraficoComponent;
  let fixture: ComponentFixture<GraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoComponent ],
      imports: [
        NgChartsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve haver os objetos para configuração do gráfico corretos', () => {
    expect(component.barChartData).toBeTruthy();
    expect(component.barChartOptions).toBeTruthy();
    expect(component.barChartOptions?.responsive).toBeTrue();
  });

  it('Deve alterar os dados do gráfico ao enviar novos dados', () => {

    let labels = ['Gols'];
    let datas = [2, 3, 4];
    
    component.labels = labels;
    component.dataGraf = datas;
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.barChartData.labels).toEqual(labels);
    expect(component.barChartData.datasets[0].data).toEqual(datas);

  });
});
