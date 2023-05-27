import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { By } from '@angular/platform-browser';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve conter um elemento message e mostrar a mensagem passada', () => {
    component.message = 'Teste mensagem';
    fixture.detectChanges();

    let cardClasses = fixture.debugElement.query(By.css('.message')).attributes;
    let message = fixture.debugElement
      .query(By.css('.message'))
      .nativeElement.querySelector('p');

    expect(message.textContent).toBe('Teste mensagem');
    expect(cardClasses['class']).toContain('show');
  });

  it('Deve esconder a mensagem após 5 segundos passados', fakeAsync(() => {
    
    component.temporizadorMensagem();
    tick(5010);
    fixture.detectChanges();
    let cardClasses = fixture.debugElement.query(By.css('.message')).attributes;
    expect(cardClasses['class']).toContain('no-show');
    expect(component.isShow).toBeFalse();
  }));
});
