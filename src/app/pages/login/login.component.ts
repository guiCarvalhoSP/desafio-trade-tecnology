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
  msg: string = '';

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
      (err) => {
        console.log(err);
        this.msg = 'Erro ao fazer login. Tente novamente mais tarde.'
      }
    );
  }
  
  ngOnDestroy(): void {
    this.event.unsubscribe();
  }

  onSubmit() {
    if(this.formulario.valid){
      let key = this.formulario.get('key').value;
      this.isLoading = true;
      this.loginService.login(key, this.event);
    } else {
      this.msg = 'Erro ao fazer login. Digite uma key válida';
    }
  }

  get key(): any {
    return this.formulario.get('key');
  }
}
