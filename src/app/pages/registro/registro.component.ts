import { ChangeDetectionStrategy, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroComponent implements OnInit {
  contactForm!: FormGroup
  public showAlertDanger = false
  submitted = false
  constructor(public fb: FormBuilder, private apiService: ApiService, private router: Router) {




  }
  ngOnInit(): void {
    this.contactForm = this.initForm()
  }
  validarCorreo() {
    if (!this.contactForm.get('correo')?.invalid) {
      this.showAlertDanger = false;
    } else {
      this.showAlertDanger = true;
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombres: [null,],
      apellidos: [null,],
      tipoDocumento: [null, Validators.required],
      contraseña: [null,],
      programa: [null,],
      numeroTelefono: [null,],
      correo: [null, Validators.email],
      nuevaContraseña: [null,],
      politica: [null,],
      numeroDocumento: [null,],
      facultad: [null,]
    })
  }
  onSubmit(event: Event) {
    console.log(this.contactForm.get('contraseña'),this.contactForm.get('nuevaContraseña'));
    
    if (this.contactForm.valid && this.contactForm.get('contraseña')?.value === this.contactForm.get('nuevaContraseña')?.value) {
      console.log(this.contactForm.value);



      let estudiante: Estudiante = {

        nombres: this.contactForm.value.nombres,
        apellidos: this.contactForm.value.apellidos,
        tipoDocumento: this.contactForm.value.tipoDocumento,
        numeroDocumento: this.contactForm.value.numeroDocumento,
        numeroTelefono: this.contactForm.value.numeroTelefono,
        facultad: this.contactForm.value.facultad,
        programa: this.contactForm.value.programa,
        correo: this.contactForm.value.correo,
        contraseña: this.contactForm.value.contraseña,
      }
      console.log('el estudiante es',estudiante);
      
      this.apiService.insertData(estudiante)
      // Swal.fire("registro existoso", "el registro ha sido exitoso", "success")

      this.router.navigate(['/auth/login'])
    } else {
      console.log('invalido');
      alert('deben coincidir las contraseñas')
    }











  }
  showAlert() {
    alert('la politica es requerida')
  }




}


