import { Component, Input } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';
import { tap } from 'rxjs';

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
}
