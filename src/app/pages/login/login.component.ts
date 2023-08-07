import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  contactForm!: FormGroup;
  showAlert = false;
  showAlertError = false;
  submitted = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private apiservice: ApiService
  ) {
    this.contactForm = fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }
  validarInput() {
    if (!this.contactForm.get('email')?.invalid) {
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }

  onSubmit(form: any): void {
    console.log(form);

    let token = '';
    let id_usuario = 0;
    this.submitted = true;

    if (this.contactForm.valid) {
      this.apiservice
        .loginService(form.email, form.password)
        .subscribe((response: any) => {
          console.log(response);
        if(response.id_estado==1){
          if (response.rol == 1 ) {
            this.router.navigate(['estudiante']);
            token = response.token;
            localStorage.setItem('token', token);
            id_usuario = response.usuario;
          } else if (response.rol == 2) {
            this.router.navigate(['docente']);
            token = response.token;
            localStorage.setItem('token', token); 
            id_usuario = response.usuario;
          } else {
            this.showAlertError = true;
          }
        }else if(response.id_estado==2){
          Swal.fire('Advertencia ',"el usuario ha sido deshabilitado porfavor comunicarte con el administrador","warning")
        }else {
          Swal.fire('Error',"Correo y/o contraseña incorrecto","error")
        }
        });
    }
  }
}
