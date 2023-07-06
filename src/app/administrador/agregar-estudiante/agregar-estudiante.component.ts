import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';

@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.scss']
})
export class AgregarEstudianteComponent implements OnInit {
 
    contactForm!: FormGroup
    public showAlertDanger = false
    submitted = false
    constructor(public fb: FormBuilder,private apiService:ApiService) {
      
  
  
      
    }
    ngOnInit(): void {
      this.contactForm=this.initForm()
    }
    validarCorreo() {
      if (!this.contactForm.get('correo')?.invalid) {
        this.showAlertDanger = false;
      } else {
        this.showAlertDanger = true;
      }
    }
  
    initForm():FormGroup{
      return this.fb.group({
        nombres: [null,Validators.required],
        apellidos: [null,Validators.required],
        tipoDocumento: [null, Validators.required],
        contraseña: [null,Validators.required],
        programa: [null,Validators.required],
        numeroTelefono: [null,Validators.required],
        correo: [null, Validators.email],
        nuevaContraseña: [null,Validators.required],
        numeroDocumento: [null,Validators.required],
        facultad: [null,Validators.required]
      })
    }
    onSubmit() {
      this.submitted=true
  
     
      if (this.contactForm.valid&& this.contactForm.get('contraseña')?.value === this.contactForm.get('nuevaContraseña')?.value) {
          console.log(this.contactForm.value);
    
    
    
          let estudiante: Estudiante = {
            
            nombre: this.contactForm.value.nombres,
            apellido: this.contactForm.value.apellidos,
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
          alert('el estudiante ha sido agregado con exito')
    
        } else {
          console.log('invalido');
          alert('deben coincidir las contraseñas')
        }       
  
       return
        
      }
     
  
      
      
      
       
     
  
  
  
  
    
   
   
  
  }
  
  
  

