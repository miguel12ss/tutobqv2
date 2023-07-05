import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NavbarServices } from 'src/app/services/navbar.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';
import { EstudianteService } from '../services/estudiante.service';
import { ComponentService } from 'src/app/components/services/components.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  contactForm!: FormGroup
  passwordForm!:FormGroup
  estudiante!: Estudiante
  indice!: number
  public showAlertDanger = false
  submitted = false
  constructor(public fb: FormBuilder, private estudianteservice: EstudianteService, private componentService: ComponentService) {




  }
  ngOnInit(): void {
    this.contactForm = this.initForm()
    this.passwordForm=this.initFormContraseña()
    this.indice = this.componentService.getId
    console.log(this.indice);

    this.estudianteservice.getDataForId().pipe(
      tap((res: Estudiante) => {
        console.log(res);

        this.contactForm.patchValue({
          nombres: res.nombre,
          apellidos: res.apellido,
          tipoDocumento: res.tipoDocumento,
          contraseña: res.contraseña,
          programa: res.programa,
          numeroTelefono: res.numeroTelefono,
          correo: res.correo,
          numeroDocumento: res.numeroDocumento,
          facultad: res.facultad

        })
      })
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

      programa: ['', Validators.required],
      numeroTelefono: ['', Validators.required,],
      correo: ['', Validators.email],


      numeroDocumento: ['', [Validators.required, Validators.maxLength(10)]],
      facultad: ['', Validators.required]
    })
  }

  initFormContraseña(){
    return this.fb.group({
      contraseña:['',Validators.required],
      nuevaContraseña:['',Validators.required],
    })
  }

  onSubmit(event: Event) {
    this.submitted = true


    if (this.contactForm.invalid) {
      console.log('formulario valido');


      return

    }


    console.log('invalido');









  }

  cambiarPassword(){
    if(this.passwordForm.valid){
      let form=this.passwordForm.value;
      console.log(this.indice);
      
      this.estudianteservice.getPasswordForId(this.indice,form).pipe(
        tap((password:string)=>{
          console.log(password);
          
        })
        
      ).subscribe()
    }
  
  }




}
