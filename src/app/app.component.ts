import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teste-trade-technology';

  ngOnInit() {

    if(environment.prodution) {
      console.log("Em produção")
    } else {
      console.log("Não está em produção")
    }
  }
}
