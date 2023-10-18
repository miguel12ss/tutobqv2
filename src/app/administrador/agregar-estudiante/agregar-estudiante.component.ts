import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-estudiante',
  templateUrl: './agregar-estudiante.component.html',
  styleUrls: ['./agregar-estudiante.component.scss']
})
export class AgregarEstudianteComponent implements OnInit {
    programas:any[]=[];
    facultades:any[]=[];
    tipos:any[]=[];
    contactForm!: FormGroup
    public showAlertDanger = false
    submitted = false
    constructor(public fb: FormBuilder,private apiService:ApiService,private service:AdminService) {
      
      this.contactForm=this.initForm()

  
      
    }
    ngOnInit(): void {

      forkJoin([
        this.service.getProgramas(),
        this.service.getFacultades(),
        this.service.getTipo(),
        
      ]).subscribe((results:any) => {
        // Procesa los resultados de cada solicitud
        console.log(results);
        
        this.programas = results[0].data;
        this.facultades = results[1].data;
        this.tipos=results[2].data;
      });
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
        nombres: [null],
        apellidos: [null],
        tipoDocumento: [null,],
        contraseña: [null],
        programa: [null],
        numeroTelefono: [null],
        correo: [null, Validators.email],
        nuevaContraseña: [null],
        numeroDocumento: [null],
        facultad: [null]
      })
    }
    onSubmit() {
      this.submitted=true
  
     
      if (this.contactForm.valid&& this.contactForm.get('contraseña')?.value === this.contactForm.get('nuevaContraseña')?.value) {
          console.log(this.contactForm.value);
    
    
    
          // let estudiante: Estudiante = {
            
          //   nombre: this.contactForm.value.nombres,
          //   apellido: this.contactForm.value.apellidos,
          //   tipoDocumento: this.contactForm.value.tipoDocumento,
          //   numeroDocumento: this.contactForm.value.numeroDocumento,
          //   numeroTelefono: this.contactForm.value.numeroTelefono,
          //   facultad: this.contactForm.value.facultad,
          //   programa: this.contactForm.value.programa,
          //   correo: this.contactForm.value.correo,
          //   contraseña: this.contactForm.value.contraseña,
          // }
          // console.log('el estudiante es',estudiante);
          let estudiante!:Estudiante
          this.apiService.insertData(estudiante).subscribe(
            (response:any) => {
              if(response.error){
              Swal.fire("Error", "el correo ya se encuentra registrado en el programa ", "error")
          
              }else if(response.errorIdentificacion){
                Swal.fire("Error", "el numero del documento ya se encuentra registrado en el programa ", "error")
              }else if(response.message){
                Swal.fire("¡Estudiante creado exitosamente!"," El nuevo estudiante ahora puede acceder al sistema con las credenciales proporcionadas.","success")
              }
            }
          )
          // Swal.fire("registro existoso", "el registro ha sido exitoso", "success")
          
        } else {
         Swal.fire("error","Las contraseñas deben coincidir","error")
          
        }
    }
     
  
      
      
      
       
     
  
  
  
  
    
   
   
  
  }
  
  
  

