import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { tap } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss']
})
export class CrearTutoriaComponent implements OnInit  {
  public horario:any
  horarioForm!: FormGroup;
  horarioFormUpdate!: FormGroup;
  fechaHoy=''
  salones:string[]=[]
  materias:string[]=[]
  sedes:string[]=[]
  programas:string[]=[]
  data:string[]=[]
  salonesActualizar:string[]=[]
  select=""
  estado:any
  constructor(public fb:FormBuilder,private docenteService:DocenteService,
    private componentService:ComponentService){
      const dateToday=new Date();
      this.fechaHoy = dateToday.toISOString().substring(0, 10);
      console.log(this.fechaHoy);
      this.horarioForm=this.initForm()
      this.horarioFormUpdate=this.initFormUpdate()


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
      fecha:[null],
  
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
      this.docenteService.getHorario().pipe(
        tap((res:any)=>{
          this.horario=res.data

        })
      ).subscribe()
    })
  ).subscribe()
}

onSubmitUpdate(){
  const horarioActualizar=this.horarioFormUpdate.value
  console.log(horarioActualizar);
  

  this.docenteService.actualizarHorario(horarioActualizar)

  
}


getData(id_tutoria:string){{
this.docenteService.getEstadosTutoria().pipe(
  tap((res:any)=>{
    console.log(res)
    this.estado=res
    
  })
).subscribe()

// this.docenteService.getSalones().pipe(
//   tap((res:any)=>{
   
    
//     this.salonesActualizar=res
    
this.docenteService.getDataForUpdate(id_tutoria).pipe(
  tap((res:any)=>{
    console.log(res.data.salon);
    
    
  this.horarioFormUpdate.patchValue({
    facultad:res.data.facultad,
      tema:res.data.tema,
      capacidad:res.data.capacidad,
      horaInicio:res.data.horaInicio,
      programa:res.data.programa,
      docente:res.data.nombres,
      horaFin:res.data.horaFin,
      materia:res.data.materia,
      fecha:res.data.fecha,
      estadoTutoria:res.data.estado_tutoria,
      salon:res.data.salon,
      sede:res.data.sede,
      id_tutoria:res.data.id_tutoria
  })
 
  
   
  })
).subscribe()



}}



}


