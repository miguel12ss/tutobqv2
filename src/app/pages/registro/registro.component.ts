import { ChangeDetectionStrategy, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
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
  

  programas:Array<string> =[]
  facultades:Array<string> =[]
  tipoDocumento:Array<string> =[]
  constructor(public fb: FormBuilder, private apiService: ApiService, private router: Router,private componentService:ComponentService) {
    


  }
  ngOnInit(): void {



    this.contactForm = this.initForm()
   

    this.componentService.getTipoDocumento.pipe(
      tap((res:any)=>{
        let json= JSON.stringify(res)
        console.log(json)
this.tipoDocumento=res
      })
    ).subscribe()

this.componentService.getFacultades().pipe(
  tap((res:any)=>{
    this.facultades=res
  })
).subscribe()




  }

  onSelect(event:any){
   
    
    this.programas=[]
    const facultad=event.target.value
  
    this.apiService.getProgramas(facultad).pipe(
      tap((res:any)=>{
        this.programas=res.data
      })
    ).subscribe()
    
  }
  
  
  
  


  initForm(): FormGroup {
    return this.fb.group({
      nombres: [null,Validators.required],
      apellidos: [null,Validators.required],
      tipoDocumento: [null, Validators.required],
      contraseña: [null,[Validators.required,Validators.maxLength(10),Validators.minLength(7)]],
      programa: [null,Validators.required],
      numeroTelefono: [null,[Validators.required,Validators.minLength(7),Validators.maxLength(10)]],
      correo: [null, Validators.email],
      nuevaContraseña: [null,[Validators.required,Validators.maxLength(10),Validators.minLength(7)]],
      numeroDocumento: [null,[Validators.required,Validators.maxLength(10)]],
      facultad: [null,Validators.required],
      politica:[null,Validators.required]
    })
  }
  onSubmit(event: Event) {
    console.log(this.contactForm.get('contraseña'),this.contactForm.get('nuevaContraseña'));
    
    if (this.contactForm.valid && this.contactForm.get('contraseña')?.value === this.contactForm.get('nuevaContraseña')?.value) {
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
      
      this.apiService.insertData(estudiante).subscribe(
        (response:any) => {
          if(response.error){
          Swal.fire("Error", "el correo ya se encuentra registrado en el programa ", "error")
      
          }else if(response.errorIdentificacion){
            Swal.fire("Error", "el numero del documento ya se encuentra registrado en el programa ", "error")
          }else{
            this.router.navigate(['/auth/login'])

          }
        }
      )
      // Swal.fire("registro existoso", "el registro ha sido exitoso", "success")
      
    } else {
      console.log('invalido');
      
    }











  }



}


