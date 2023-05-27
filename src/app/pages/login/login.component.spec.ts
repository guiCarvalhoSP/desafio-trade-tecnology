import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { LoginService } from 'src/app/services/login.service';




describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let formBuilder: FormBuilder;

  let mockLoginService = {
    login: jasmine
      .createSpy('login')
      .and.callFake((key: string, emmiter: EventEmitter<boolean>) => {
        emmiter.emit(true);
      }),
  
    estaLogado: jasmine.createSpy('estaLogado').and.returnValue(null),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, LoadingComponent, MessageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService
        },
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente deve ter um input key, para se colocar a key da api', () => {
    expect(component.formulario.contains('key')).toBeTrue();
  })

  it('Ao submeter o formulario válido, deve chamar o método de fazer login do LoginService', () => {
    component.formulario.get('key')?.setValue('key');
    fixture.detectChanges();
    component.onSubmit();

    expect(mockLoginService.login).toHaveBeenCalled();
    expect(component.formulario.valid).toBeTrue();
  });

  it('Ao tentar submeter um formulário invalido, o botão de submit deve ficar desabilitado', () => {
    // let formGroup: FormGroup = formBuilder.group({
    //   key: ['', ],
    // });
    // formGroup.contains get('key')?.
    component.formulario.get('key')?.setValue('');
    fixture.detectChanges();

    let buttonLogout = fixture.debugElement.query(By.css('.submitButton')).nativeElement;

    expect(buttonLogout.disabled).toBeTrue();
    expect(component.formulario.valid).toBeFalse();
  });

  it('Deve submeter ao clicar no botão, caso o formulario esteja válido ', () => {
    // let formGroup: FormGroup = formBuilder.group({
    //   key: ['', ],
    // });
    // formGroup.contains get('key')?.
    component.formulario.get('key')?.setValue('key');
    fixture.detectChanges();

    let buttonLogout:HTMLElement = fixture.debugElement.nativeElement.querySelector('.submitButton');

    buttonLogout.click();
    fixture.detectChanges();


    expect(mockLoginService.login).toHaveBeenCalled();
    expect(component.formulario.valid).toBeTrue();
  });
});
