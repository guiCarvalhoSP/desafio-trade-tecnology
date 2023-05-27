import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { CardComponent } from 'src/app/components/card/card.component';
import { GraficoComponent } from 'src/app/components/grafico/grafico.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { ICountry } from 'src/app/interfaces/country.interface';
import { ILeagues } from 'src/app/interfaces/leagues.interface';
import { ITeams, ITeamStatics } from 'src/app/interfaces/team.interfaces';
import { FootballService } from 'src/app/services/football.service';

import { HomeComponent } from './home.component';
import { mockCountry, mockEstatisticas, mockLeagues, mockPlayers, mockTimes } from './mock-response';
import { IPlayers } from 'src/app/interfaces/player.interface';
import { NgChartsModule } from 'ng2-charts';

const mockFootballService = {
  listarPaises: jasmine.createSpy('listarPaises').and.returnValue(
    new Observable<ICountry>((subscriber) => {
      subscriber.next(mockCountry);
    })
  ),

  listarLigas: jasmine.createSpy('listarLigas').and.returnValue(
    new Observable<ILeagues>((subscriber) => {
      subscriber.next(mockLeagues);
    })
  ),

  listarTimesDaLiga: jasmine.createSpy('listarTimesDaLiga').and.returnValue(
    new Observable<ITeams>((subscriber) => {
      subscriber.next(mockTimes);
    })
  ),

  listarEstatiticasDoTime: jasmine.createSpy('listarEstatiticasDoTime').and.returnValue(
    new Observable<ITeamStatics>((subscriber) => {
      subscriber.next(mockEstatisticas);
    })
  ),

  listarTemporadas: jasmine.createSpy('listarTemporadas').and.returnValue([2023]),

  listarJogadoresDoTime: jasmine.createSpy('listarJogadoresDoTime').and.returnValue(
    new Observable<IPlayers>((subscriber) => {
      subscriber.next(mockPlayers);
    })
  ),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoadingComponent,
        MessageComponent,
        CardComponent,
        GraficoComponent,
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, NgChartsModule],
      providers: [
        {
          provide: FootballService,
          useValue: mockFootballService,
        },
      ],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente deve ter os input select para selecionar pais, além dos input de temporada, liga e time desabilitados', () => {
    expect(component.formulario.contains('pais')).toBeTrue();
    expect(component.formulario.get('liga')?.disabled).toBeTrue();
    expect(component.formulario.get('time')?.disabled).toBeTrue();
    expect(component.formulario.get('temporada')?.disabled).toBeTrue();
  });

  it('Deve obter lista de paises ao criar componente', () => {
    expect(mockFootballService.listarPaises).toHaveBeenCalled();
  });

  it('Deve obter lista de ligas do pais , habilitar o campo ligas e desabilitar os campos temporadas e time', () => {
    
    component.formulario.get('pais')?.setValue('pais');
    spyOn(component, 'desabilitarCampos');
    component.obterListaDeLigas();
    fixture.detectChanges();


    expect(mockFootballService.listarLigas).toHaveBeenCalled();
    expect(component.desabilitarCampos).toHaveBeenCalledWith('temporada', 'time')
    expect(component.formulario.get('liga')?.disabled).toBeFalse();
    expect(component.formulario.get('time')?.disabled).toBeTrue();
    expect(component.formulario.get('temporada')?.disabled).toBeTrue();
  });

  it('Deve obter lista de time, e habilitar o campo time', () => {
    
    component.formulario.get('pais')?.setValue('pais');
    component.formulario.get('liga')?.enable();
    component.formulario.get('temporada')?.enable;

    component.formulario.get('liga')?.setValue('liga');
    component.formulario.get('temporada')?.setValue('2023');

    component.obterListaDeTimes();
    fixture.detectChanges();

    expect(mockFootballService.listarTimesDaLiga).toHaveBeenCalledWith('liga', '2023');
    expect(component.formulario.get('time')?.disabled).toBeFalse();
  });

  it('Deve listar temporadas de uma liga,e habilitar campo temporadas e desabilitar campo time', () => {
    
    component.formulario.get('pais')?.setValue('pais');
    component.formulario.get('liga')?.enable();
    component.formulario.get('liga')?.setValue('liga');

    component.listaLigas = mockLeagues;

    spyOn(component, 'desabilitarCampos');

    component.listarTemporadas();

    fixture.detectChanges();

    expect(mockFootballService.listarTemporadas).toHaveBeenCalledWith(mockLeagues, 'liga');
    expect(component.formulario.get('temporada')?.disabled).toBeFalse();
    expect(component.desabilitarCampos).toHaveBeenCalledWith('time');
  });

  it('Ao fazer o submit, deve listar as estatisticas do time', () => {
    
    component.formulario.get('pais')?.setValue('pais');
    component.formulario.get('liga')?.enable();
    component.formulario.get('temporada')?.enable;
    component.formulario.get('time')?.enable;

    component.formulario.get('liga')?.setValue('liga');
    component.formulario.get('temporada')?.setValue('2023');
    component.formulario.get('time')?.setValue('time');

    component.onSubmit();
    fixture.detectChanges();

    expect(mockFootballService.listarEstatiticasDoTime).toHaveBeenCalledWith('liga', '2023', 'time');
  });

  it('Deve habilitar campos desabilitados', () => {
    
    component.formulario.get('pais')?.setValue('pais');

    component.habilitarCampos('liga', 'temporada');

    expect(component.formulario.get('pais')?.enabled).toBeTrue();
    expect(component.formulario.get('liga')?.enabled).toBeTrue();
    expect(component.formulario.get('temporada')?.enabled).toBeTrue();

  });

  it('Deve desabilitar campos habilitados', () => {
    
    component.formulario.get('pais')?.setValue('pais');
    component.formulario.get('liga')?.enable();
    component.formulario.get('temporada')?.enable;

    component.desabilitarCampos('liga', 'temporada');

    expect(component.formulario.get('pais')?.enabled).toBeTrue();
    expect(component.formulario.get('liga')?.disabled).toBeTrue();
    expect(component.formulario.get('temporada')?.disabled).toBeTrue();

  });
});
