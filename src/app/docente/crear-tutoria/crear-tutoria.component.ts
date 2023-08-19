import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { tap } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss']
})
export class CrearTutoriaComponent implements OnInit  {
  public horario:any
  horaMinima: string = '07:00';
horaMaxima: string = '20:00';
horaFinalMinima:string="08:00"
horaFinalMaxima:string="21:00"
  horarioForm!: FormGroup;
  horarioFormUpdate!: FormGroup;
  dateNext=''
  salones:string[]=[]
  materias:string[]=[]
  sedes:string[]=[]
  programas:string[]=[]
  data:string[]=[]
  salonesActualizar:string[]=[]
  select=""
  estado:any
  public estudiantes:any=[]
  constructor(public fb:FormBuilder,private docenteService:DocenteService,
    private componentService:ComponentService){
      const dateToday=new Date();
      dateToday.setDate(dateToday.getDate()+1)
      
      this.dateNext = dateToday.toISOString().substring(0, 10);
      console.log(this.dateNext);
      
      
      this.horarioForm=this.initForm()
      this.horarioFormUpdate=this.initFormUpdate()
      this.horarioForm.get('horaInicio')?.valueChanges.subscribe((horaSeleccionada) => {
        const horaFin=this.horarioForm.get('horaFin')?.value

        if (horaSeleccionada < this.horaMinima) {
          this.horarioForm.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
        } else if (horaSeleccionada > this.horaMaxima) {
          
          this.horarioForm.get('horaInicio')?.setValue(this.horaMaxima, { emitEvent: false });
        }else if(horaSeleccionada<horaFin){          
          this.horarioForm.get('horaFin')?.setValue(this.horaFinalMaxima, { emitEvent: false });

        }else if(horaSeleccionada==horaFin){
          this.horarioForm.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
          this.horarioForm.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
        }
      });

      this.horarioForm.get('horaFin')?.valueChanges.subscribe((horaSeleccionada) => {
  
        const horaInicio=this.horarioForm.get('horaInicio')?.value
        
        
        if (horaSeleccionada < this.horaMinima) {
          this.horarioForm.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
        } else if (horaSeleccionada > this.horaMaxima) {
          console.log(this.horaMaxima);
          
          this.horarioForm.get('horaFin')?.setValue(this.horaFinalMaxima, { emitEvent: false });
        }else if(horaSeleccionada<horaInicio){
          console.log('hm',horaSeleccionada,'hi',horaInicio);
          
          this.horarioForm.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });

        }else if(horaSeleccionada==horaInicio){
          this.horarioForm.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
          this.horarioForm.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
        }
      });
//formulario de actualizar 

this.horarioFormUpdate.get('horaInicio')?.valueChanges.subscribe((horaSeleccionada) => {
  const horaFin=this.horarioFormUpdate.get('horaFin')?.value

  if (horaSeleccionada < this.horaMinima) {
    this.horarioFormUpdate.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
  } else if (horaSeleccionada > this.horaMaxima) {
    
    this.horarioFormUpdate.get('horaInicio')?.setValue(this.horaMaxima, { emitEvent: false });
  }else if(horaSeleccionada<horaFin){          
    this.horarioFormUpdate.get('horaFin')?.setValue(this.horaFinalMaxima, { emitEvent: false });

  }else if(horaSeleccionada==horaFin){
    this.horarioFormUpdate.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
    this.horarioFormUpdate.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
  }
});

this.horarioFormUpdate.get('horaFin')?.valueChanges.subscribe((horaSeleccionada) => {

  const horaInicio=this.horarioFormUpdate.get('horaInicio')?.value
  
  
  if (horaSeleccionada < this.horaMinima) {
    this.horarioFormUpdate.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
  } else if (horaSeleccionada > this.horaMaxima) {
    console.log(this.horaMaxima);
    
    this.horarioFormUpdate.get('horaFin')?.setValue(this.horaFinalMaxima, { emitEvent: false });
  }else if(horaSeleccionada<horaInicio){
    console.log('hm',horaSeleccionada,'hi',horaInicio);
    
    this.horarioFormUpdate.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });

  }else if(horaSeleccionada==horaInicio){
    this.horarioFormUpdate.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
    this.horarioFormUpdate.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
  }
});








     

    }
   initFormUpdate():FormGroup{
    return this.fb.group({
      facultad:[null,Validators.required],
      tema:[null,Validators.required],
      capacidad:[null,Validators.required],
      horaInicio:[null,Validators.required],
      programa:[null,Validators.required],
      sede:[null,Validators.required],
      horaFin:[null,Validators.required],
      materia:[null,Validators.required],
      salon:[null,Validators.required],
      fecha:[null,Validators.required],
      estadoTutoria:[null,Validators.required],
      id_tutoria:[null,Validators.required]
    })
   }
  ngOnInit(): void {
    this.docenteService.getHorario().pipe(
      tap((res:any)=>{
        this.horario=res.data
        console.log(this.horario);
        
      })
    ).subscribe()
    this.docenteService.getSalones().pipe(
      tap((res:any) => {
        this.salones=res
      })
    ).subscribe()

    this.docenteService.getMaterias().pipe(
      tap((res:any) => {
        this.materias=res
      })
    ).subscribe()

    this.docenteService.getSedes().pipe(
      tap((res:any) => {
        this.sedes=res
      })
    ).subscribe()
    this.componentService.getPrograms.pipe(
      tap((res:any) => {
        this.programas=res
      })
    ).subscribe()
      this.docenteService.getDataForId().pipe(
        tap((res:any)=>{
         
         this.horarioForm.patchValue({
          facultad:res.data.facultad,
          docente:res.data.nombre
         })
        })
      ).subscribe()
    
  }

validarHora(horaSeleccionada:any){
  console.log(horaSeleccionada);
  
}
  
  initForm():FormGroup{
    return this.fb.group({
      facultad:[null,Validators.required],
      tema:[null,Validators.required],
      capacidad:[null,Validators.required],
      horaInicio:[null,Validators.required],
      programa:[null,Validators.required],
      sede:[null,Validators.required],
      docente:[null,Validators.required],
      horaFin:[null,Validators.required],
      materia:[null,Validators.required],
      salon:[null,Validators.required],
      fecha:[null,Validators.required],
  
    })
  
}
onSelect(event:any){
  const salon=event.target.value
  this.docenteService.obtenerCapacidadPorSalon(salon).pipe(
    tap((res:any)=>{
      
      console.log(res);
      
      console.log(res.data.capacidad);
      
    this.horarioForm.patchValue({
      capacidad:res.data.capacidad,
      sede:res.data.sede
    })
   
    })
  ).subscribe()
}

onSelectUpdate(event:any){
  const salon=event.target.value
  this.docenteService.obtenerCapacidadPorSalon(salon).pipe(
    tap((res:any)=>{
      
      console.log(res);
      
      console.log(res.data.capacidad);
      
    this.horarioFormUpdate.patchValue({
      capacidad:res.data.capacidad,
      sede:res.data.sede
    })
   
    })
  ).subscribe()
}
onSubmit(){
  const horario=this.horarioForm.value
  this.docenteService.crearHorario(horario).pipe(
    tap((res:any)=>{
      console.log(res);
      if(res.error){
        Swal.fire("Error",res.error,"warning")
        return
      }
      this.docenteService.getHorario().pipe(
        tap((res:any)=>{
          
          this.horario=res.data

        })
      ).subscribe()
    })
  ).subscribe()
}



listado(id_tutoria:string){
  this.docenteService.getListado(id_tutoria).pipe(
    tap((res:any)=>{
    
      

      this.estudiantes=res.estudiante
      console.log(this.estudiantes);
      
    })
  ).subscribe()
}

getData(id_tutoria:string){

  Swal.fire({
    title: 'Estas seguro que deseas eliminarlo',
    text: "no podra ser revertido",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si,Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'La tutoria ha sido eliminada.',
        'success'
      )
      this.docenteService.eliminarTutoria(id_tutoria)
      this.docenteService.getHorario().pipe(
        tap((res:any)=>{
          console.log(res);
          
this.horario=res.data
        })
      ).subscribe()
    }
  })
// this.docenteService.getEstadosTutoria().pipe(
//   tap((res:any)=>{
//     console.log(res)
//     this.estado=res
    
//   })
// ).subscribe()

// // this.docenteService.getSalones().pipe(
// //   tap((res:any)=>{
   
    
// //     this.salonesActualizar=res
    
// this.docenteService.getDataForUpdate(id_tutoria).pipe(
//   tap((res:any)=>{
  
    
    
//   this.horarioFormUpdate.patchValue({
//     facultad:res.data.facultad,
//       tema:res.data.tema,
//       capacidad:res.data.capacidad,
//       horaInicio:res.data.horaInicio,
//       programa:res.data.programa,
//       docente:res.data.nombres,
//       horaFin:res.data.horaFin,
//       materia:res.data.materia,
//       fecha:res.data.fecha,
//       estadoTutoria:res.data.estado_tutoria,
//       salon:res.data.salon,
//       sede:res.data.sede,
//       id_tutoria:res.data.id_tutoria
      
//   })
  
  
   
//   })
// ).subscribe()



// }}
}
}




