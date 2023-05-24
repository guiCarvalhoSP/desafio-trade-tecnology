import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy{
  showPassword: boolean = false;
  hasError: boolean = false;
  formulario: FormGroup | any;
  isLoading: boolean = false;

  event = new EventEmitter<boolean>(true);

  constructor(
    private router: Router,
    private loginService: LoginService,
    formBuilder: FormBuilder
  ) {
    if (this.loginService.estaLogado()) {
      this.router.navigate(['/']);
    } else {
      this.formulario = formBuilder.group({
        key: ['', [Validators.required]],
      });
    }

    this.event.subscribe(
      (value) => {
        if (!value) {
          this.hasError = true;
          this.isLoading = false;
        }
      },
      (err) => console.log(err)
    );
  }
  
  ngOnDestroy(): void {
    this.event.unsubscribe();
  }

  async onSubmit() {
    let key = this.formulario.get('key').value;
    this.isLoading = true;
    await this.loginService.login(key, this.event)
  }

  get key(): any {
    return this.formulario.get('key');
  }
}
