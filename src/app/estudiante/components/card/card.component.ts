import { Component, Input } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() horario!:any

  constructor(private estudianteService:EstudianteService){
    console.log(this.horario);
    
  }

  descripcion(id_tutoria:number){
    console.log(id_tutoria);
    
   this.estudianteService.getHorarioForId(id_tutoria).pipe(
    tap((res:any)=>{
      console.log(res);
      
    })
   ).subscribe()
    
  }
}
