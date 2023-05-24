import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnChanges {

  @Input()
  message: string = 'Aconteceu algum erro. Tente novamente mais tarde!';
  
  isShow: boolean = true;

  ngOnInit() {
    this.temporizadorMensagem();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.temporizadorMensagem();

  }
  
  temporizadorMensagem() {
    setTimeout(() => {
      this.isShow = false;
    }, 5000)
  }
}
