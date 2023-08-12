import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { forkJoin, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocenteService } from 'src/app/docente/services/docente.service';

@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss']
})
export class CrearTutoriaComponent implements OnInit {
  fechaHoy=""
  searchValue = '';
  visible = false;
  horaMinima: string = '07:00';
  horaMaxima: string = '20:00';
  horaFinalMinima:string="08:00"
  horaFinalMaxima:string="21:00"
horarios:any[]=[]
horario:any={}
horarioForm!:FormGroup
horarioAgregar!:FormGroup
programas:any[]=[]
facultades:any[]=[]
salones:any[]=[]
materias:any[]=[]
docentes:any[]=[]
sedes:any[]=[]
dateNext:any
listOfDisplayData = [...this.horarios];

constructor(private service:AdminService,public readonly fb:FormBuilder,private docenteService:DocenteService){
  const dateToday=new Date();
  dateToday.setDate(dateToday.getDate()+1)
  
  this.dateNext = dateToday.toISOString().substring(0, 10);
  this.fechaHoy = dateToday.toISOString().substring(0, 10);
  console.log(this.fechaHoy);
  this.horarioForm=this.initForm()
  this.horarioAgregar=this.initFormAgregar()



  //horarios 

  this.horarioAgregar.get('horaInicio')?.valueChanges.subscribe((horaSeleccionada) => {
    const horaFin=this.horarioAgregar.get('horaFin')?.value

    if (horaSeleccionada < this.horaMinima) {
      this.horarioAgregar.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
    } else if (horaSeleccionada > this.horaMaxima) {
      
      this.horarioAgregar.get('horaInicio')?.setValue(this.horaMaxima, { emitEvent: false });
    }else if(horaSeleccionada<horaFin){          
      this.horarioAgregar.get('horaFin')?.setValue(this.horaFinalMaxima, { emitEvent: false });

    }else if(horaSeleccionada==horaFin){
      this.horarioForm.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
      this.horarioForm.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
    }
  });

  this.horarioAgregar.get('horaFin')?.valueChanges.subscribe((horaSeleccionada) => {

    const horaInicio=this.horarioAgregar.get('horaInicio')?.value
    
    
    if (horaSeleccionada < this.horaMinima) {
      this.horarioAgregar.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
    } else if (horaSeleccionada > this.horaMaxima) {
      console.log(this.horaMaxima);
      
      this.horarioAgregar.get('horaFin')?.setValue(this.horaFinalMaxima, { emitEvent: false });
    }else if(horaSeleccionada<horaInicio){
      console.log('hm',horaSeleccionada,'hi',horaInicio);
      
      this.horarioAgregar.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });

    }else if(horaSeleccionada==horaInicio){
      this.horarioAgregar.get('horaFin')?.setValue(this.horaFinalMinima, { emitEvent: false });
      this.horarioAgregar.get('horaInicio')?.setValue(this.horaMinima, { emitEvent: false });
    }
  });

}
initForm():FormGroup{
return this.fb.group({
  facultad:[null,Validators.required],
  tema:[null,Validators.required],
  capacidad:[null,Validators.required],
  horaInicio:[null,Validators.required,],
  programa:[null,Validators.required],
  sede:[null,Validators.required],
  horaFin:[null,Validators.required],
  materia:[null,Validators.required],
  salon:[null,Validators.required],
  fecha:[null,Validators.required],
  docente:[null,Validators.required],
  id_tutoria:[null,Validators.required],
  
})
}
ngOnInit(): void {
  forkJoin([
    this.service.getHorario(),
    this.service.getProgramas(),
    this.service.getFacultades(),
    this.service.getMaterias(),
    this.service.getSalones(),
    this.service.getDocentes(),
    this.service.getSedes()
  ]).subscribe((results:any) => {
    // Procesa los resultados de cada solicitud
    console.log(results);
    
    this.horarios = results[0].data;
    this.listOfDisplayData=[...results[0].data]

    this.programas = results[1].data;
    this.facultades = results[2].data;
    this.materias = results[3].data;
    this.salones = results[4].data;
    this.docentes = results[5].data;
    this.sedes = results[6].data;
  });

 


}

onChange(event:any){
  const salon=event.target.value
  this.docenteService.obtenerCapacidadPorSalon(salon).pipe(
    tap((res:any)=>{
      console.log(res);
      
    this.horarioAgregar.patchValue({
      capacidad:res.data.capacidad,
      sede:res.data.sede
    })
   
    })
  ).subscribe()

}

onChangeValue(event:any){
  const salon=event.target.value
  this.docenteService.obtenerCapacidadPorSalon(salon).pipe(
    tap((res:any)=>{
      console.log(res);
      
    this.horarioForm.patchValue({
      capacidad:res.data.capacidad,
      sede:res.data.sede
    })
   
    })
  ).subscribe()
}

initFormAgregar():FormGroup{
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
    docente:[null,Validators.required],
  })

}
getIdDocente(){
const docente=""
}



agregar(){
const horario=this.horarioAgregar.value
console.log(horario);

this.service.crearHorario(horario).pipe(
  tap((res:any)=>{
    if(res.error){
      Swal.fire("Error",res.error,"warning")
      return
    }
    this.service.getHorario().pipe(
      tap((res:any)=>{
        
        this.horario=res.data

      })
   ).subscribe()
    
  })
).subscribe()
}
getHorarioForId(id_horario:string){
this.docenteService.getHorarioForId(id_horario).pipe(
  tap((res:any)=>{
    this.horario=res.data
    console.log(res.data);
    
    console.log(res.data.id_tutoria);
    
    const nombres=`${res.data.nombres} ${res.data.apellidos}-${res.data.id_docente}`
    console.log(nombres);
    
    this.horarioForm.patchValue({
      facultad:res.data.facultad,
      tema:res.data.tema,
      capacidad:res.data.capacidad,
      horaInicio:res.data.horaInicio,
      programa:res.data.programa,
      docente:nombres,
      horaFin:res.data.horaFin,
      materia:res.data.materia,
      fecha:res.data.fecha,
      salon:res.data.salon,
      sede:res.data.sede,
      id_tutoria:res.data.id_tutoria
    })
  })
).subscribe()
}
onSubmit(id_tutoria:string){
  console.log(id_tutoria);
  
  const horario=this.horarioForm.value
this.service.actualizarHorarioAdmin(horario,id_tutoria)
this.service.getHorario().pipe(
  tap((res:any)=>{
this.listOfDisplayData=res.data
  })
 ).subscribe()

}
reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.horarios.filter((item: any) => item.nombres.indexOf(this.searchValue) !== -1);
}


deshabilitar(){
  Swal.fire({
    title: '¿Estas seguro de deshabilitar este horario de tutoria?',
    text: "esta accion se puede revertir",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, deshabilito'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deshabilitado',
        'La tutoria ha sido deshabilitada',
        'success'
      )
    }
  })
}}
  


  
