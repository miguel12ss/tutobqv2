import { Component, Input } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent {

  constructor(private estudianteService:EstudianteService){}
public datosModal:any={}
  public horarios:any[]=[]
  ngOnInit(): void {
    this.estudianteService.getHorarios().pipe(
      tap((res:any)=>{
        
        
        this.horarios=res.data
      })
    ).subscribe()
  }
   descripcion(horario: any) {
 console.log(horario);
 
    this.estudianteService.getHorarioForId(horario).pipe(
      tap((res:any)=>{
       
        this.datosModal =res.data; 
        
      })
    ).subscribe()
 
     

  }

  agendarTutoria(id_tutoria:number,id_estado_tutoria:number){
    this.estudianteService.agendarTutorias(id_tutoria,id_estado_tutoria).pipe(
      tap((res:any)=>{
        console.log(res);
        
        if(res.error=="Ya ha agendado esta tutoria"){
        Swal.fire('agendamiento de tutorias', 'ya ha agendado esta tutoria recientemente', 'error');
        }else if(res.message=="agendamiento creado con exito"){
          Swal.fire('agendamiento de tutorias',"agendamiento creado con exito", 'success');
        }else if(res.errorCupos="los cupos estan completos :("){
          Swal.fire('agendamiento de tutorias',"los cupos estan completos :(", 'error');
        }
        this.estudianteService.getHorarios().pipe(
          tap((res:any)=>{
            
            
            this.horarios=res.data
          })
        ).subscribe()

      })
    ).subscribe()    
  }
}
