import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid"
import { DocenteService } from '../services/docente.service';
import { tap } from 'rxjs';
import { EstudianteService } from 'src/app/estudiante/services/estudiante.service';
interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
  horaInicio:string
  horaFin:string
}
@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})



export class HorarioComponent implements OnInit {
datosModal: any={}
horario:any
estudiantes:any[]=[]
private estudianteService=inject(EstudianteService)

constructor(private docenteService:DocenteService){}

ngOnInit(): void {
  this.estudianteService.obtenerTutoriasPendientes().pipe(

    tap((res:any)=>{
    console.log(res);
    
      this.horario=res.resultado
    })
  ).subscribe()
}
 descripcion(id_tutoria:number){
this.estudianteService.getHorarioForId(id_tutoria).pipe(
  tap((res:any)=>{
    this.datosModal=res
  })
).subscribe()

 }

 listado(id_tutoria:string){
  this.docenteService.getListado(id_tutoria).pipe(
    tap((res:any)=>{
    
      console.log(res)

      this.estudiantes=res.resultado
      console.log(this.estudiantes);
      
    })
  ).subscribe()
}



}


