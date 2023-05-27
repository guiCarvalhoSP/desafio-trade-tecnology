import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule
  ]
})
export class PagesModule { }
