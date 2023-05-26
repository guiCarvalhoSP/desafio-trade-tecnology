import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { FooterComponent } from './footer/footer.component';
import { GraficoComponent } from './grafico/grafico.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { MessageComponent } from './message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GraficoComponent,
    LoadingComponent,
    CardComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ReactiveFormsModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GraficoComponent,
    LoadingComponent,
    CardComponent,
    MessageComponent,
  ]
})
export class ComponentsModule { }
