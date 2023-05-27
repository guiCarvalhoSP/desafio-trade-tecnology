import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventType, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loginService: LoginService;
  let router: Router;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {
          provide: LoginService,
          useValue: { 
            logout: jasmine.createSpy('logout'),
            estaLogado: jasmine.createSpy('estaLogado').and.returnValue(true)
          }
        },
        {
          provide: Router,
          useValue: { 
            navigate: jasmine.createSpy('navigate'),
            events: new Observable((subscriber) => {
              let event: NavigationEnd = {
                urlAfterRedirects: '',
                type: EventType.NavigationEnd,
                id: 0,
                url: '/login'
              }
              subscriber.next(event);
            })
          }
        },

      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve fazer logout ao clicar no botão de sair e redirecionar para página de login', () => {
    let buttonLogout = fixture.debugElement.query(By.css('.logout')).nativeElement;

    buttonLogout.click();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(loginService.logout).toHaveBeenCalled();
  })
});

