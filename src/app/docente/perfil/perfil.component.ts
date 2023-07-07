import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DocenteService } from '../services/docente.service';
import { Docente } from 'src/app/shared/interfaces/docente.interface';
import { tap } from 'rxjs';
import { EstudianteService } from 'src/app/estudiante/services/estudiante.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  contactForm!: FormGroup;
  passwordForm!:FormGroup;
  foto!:string
  public showAlertDanger = false;
  submitted = false;
  constructor(public fb: FormBuilder, private docenteService: DocenteService,private estudianteservice:EstudianteService) {}

  ngOnInit(): void {
    this.contactForm = this.initForm();
    this.passwordForm=this.initCambioContraseña()
    this.docenteService
      .getDataDocente()
      .pipe(
        tap((docente:any) => {
          this.foto=docente.foto
          this.contactForm.patchValue({
            nombres: docente.nombre,
            apellidos: docente.apellido,
            tipoDocumento: docente.tipoDocumento,
            numeroTelefono: docente.numeroTelefono,
            correo: docente.correo,
            numeroDocumento: docente.numeroDocumento,
            facultad: docente.facultad,
          });
        })
      )
      .subscribe();
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
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroTelefono: ['', Validators.required],
      correo: ['', Validators.email],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(10)]],
      facultad: ['', Validators.required],
    });
  }

  initCambioContraseña() {
    return this.fb.group({
      contraseña: ['', Validators.required],
      nuevaContraseña: ['', Validators.required],
      confirmarContraseña: ['', Validators.required],
    });

  }

  onSubmit() {
    if (this.contactForm.valid && this.passwordForm.get('nuevaContraseña')?.value===this.passwordForm.get('confirmarContraseña')?.value) {
     const form=this.passwordForm.value
     this.estudianteservice.getPasswordForId(form).pipe(
      tap((message:any)=>{
        if(message.message==="la contraseña ha sido cambiada"){
          return alert("La contraseña ha sido cambiada")
        }else{
          return alert("La contraseña no ha sido cambiada")
        }
        
      })
     ).subscribe()
      

      return;
    }

    alert('las contraseñas no coinciden ')
  }

  subirFoto(event:any){
    console.log(event);
    
  }
}
