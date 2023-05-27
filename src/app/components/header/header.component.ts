import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{

  isLogado: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.isLogado = this.loginService.estaLogado() ? true : false;
  }


  ngOnInit() {
    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd) {
        if(data.url != '/login' && data.url == '/') this.isLogado = true;
         else this.isLogado = false;
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
