import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import { ApiService } from 'src/app/services/api.service';
import { Docente } from 'src/app/shared/interfaces/docente.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-docente',
  templateUrl: './agregar-docente.component.html',
  styleUrls: ['./agregar-docente.component.scss'],
})
export class AgregarDocenteComponent implements OnInit {
  contactForm!: FormGroup;
  public showAlertDanger = false;
  submitted = false;
  public tipoTarjeta!:string[]
  public facultades!:string[]

  constructor(public fb: FormBuilder,private componentsService:ComponentService,private apiService:ApiService) {}
  ngOnInit(): void {
   this.contactForm=this.initForm()
    this.componentsService.getTipoDocumento.pipe(
      tap((response:any)=>{
        this.tipoTarjeta=response
        console.log(response);
        
      })
    ).subscribe()
    this.componentsService.getFacultades().pipe(
      tap((response:any)=>{

        this.facultades=response
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
      nombres: [null,Validators.required ],
      apellidos: [null,Validators.required  ],
      tipoDocumento: [null,Validators.required  ],
      contraseña: [null,Validators.required  ],
      numeroTelefono: [null,Validators.required  ],
      correo: [null, Validators.email],
      nuevaContraseña: [null,Validators.required  ],
      numeroDocumento: [null,Validators.required ],
      facultad: [null,Validators.required ],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      
      let docente:Docente={
        nombre: this.contactForm.value.nombres,
        apellido: this.contactForm.value.apellidos,
        tipoDocumento: this.contactForm.value.tipoDocumento,
        contraseña:this.contactForm.value.contraseña ,
        numeroTelefono:this.contactForm.value.numeroTelefono ,
        correo: this.contactForm.value.correo,
        numeroDocumento:this.contactForm.value.numeroDocumento ,
        facultad:this.contactForm.value.facultad 
      }
      if (this.contactForm.valid&& this.contactForm.get('contraseña')?.value === this.contactForm.get('nuevaContraseña')?.value) {
        console.log(this.contactForm.value);
  
  
  
       
        
        this.apiService.insertDocente(docente).subscribe(
          (response:any) => {
            console.log(response);
            
            if(response.error){
            Swal.fire("Error", "el correo ya se encuentra registrado en el programa ", "error")
        
            }else if(response.errorIdentificacion){
              Swal.fire("Error", "el numero del documento ya se encuentra registrado en el programa ", "error")
            }else if(response.message){
              Swal.fire("¡Docente creado exitosamente!"," El nuevo docente ahora puede acceder al sistema con las credenciales proporcionadas.","success")
            }
          }
        )
        // Swal.fire("registro existoso", "el registro ha sido exitoso", "success")
        
      } else {
       Swal.fire("error","Las contraseñas deben coincidir","error")
        
      }
    }

  }
}
