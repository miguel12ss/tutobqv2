import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DocenteService } from '../services/docente.service';
import { Docente } from 'src/app/shared/interfaces/docente.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {



  contactForm!: FormGroup
  public showAlertDanger = false
  submitted = false
  constructor(public fb: FormBuilder,private docenteService:DocenteService) {




  }

  ngOnInit(): void {
    this.contactForm=this.initForm()
    this.docenteService.getDataDocente().pipe(
      tap((docente:Docente)=>{
        this.contactForm.patchValue({
          nombres:docente.nombre ,
          apellidos: docente.apellido,
          tipoDocumento:docente.tipoDocumento ,
          numeroTelefono:docente.numeroDocumento ,
          correo: docente.correo,
          numeroDocumento: docente.numeroDocumento,
          facultad:docente.facultad 
        })
        
      }


      )
    ).subscribe()
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
      tipoDocumento: ['', Validators.required,],
      numeroTelefono: ['', Validators.required,],
      correo: ['', Validators.email],
      numeroDocumento: ['',[ Validators.required, Validators.maxLength(10)]],
      facultad: ['', Validators.required]
    })
  }

  initCambioContraseña(){

  }

  
  onSubmit(event: Event) {
    this.submitted = true


    if (this.contactForm.invalid) {
      console.log('formulario valido');


      return

    }


    console.log('invalido');









  }
  showAlert() {
    alert('la politica es requerida')
  }



}


