import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss']
})
export class CrearTutoriaComponent implements OnInit  {
  public horario:any
  constructor(private docenteService:DocenteService){}
  ngOnInit(): void {
    this.docenteService.getHorario().pipe(
      tap((res:any)=>{
        this.horario=res.data
        console.log(this.horario);
        
        
      })
    ).subscribe()
  }
}
