import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid"
import { DocenteService } from '../services/docente.service';
import { tap } from 'rxjs';
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

constructor(private docenteService:DocenteService){}

ngOnInit(): void {
  this.docenteService.getHorarioForEstado().pipe(

    tap((res:any)=>{
    console.log(res);
    
      this.horario=res.data
    })
  ).subscribe()
}
 descripcion(id_tutoria:string){
this.docenteService.getHorarioForId(id_tutoria).pipe(
  tap((res:any)=>{
    this.datosModal=res.data
  })
).subscribe()

 }
}


