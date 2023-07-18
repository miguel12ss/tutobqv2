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

  public horario:Object[]=[]
  ngOnInit(): void {
    this.estudianteService.getHorarios().pipe(
      tap((res:any)=>{
        
        
        this.horario=res.data
      })
    ).subscribe()
  }
}
