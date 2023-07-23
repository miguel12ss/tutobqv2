import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../services/estudiante.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tutorias-pendientes',
  templateUrl: './tutorias-pendientes.component.html',
  styleUrls: ['./tutorias-pendientes.component.scss']
})
export class TutoriasPendientesComponent implements OnInit{
public horario:any[]=[]
public datosModal:any={}
  constructor(private estudianteService:EstudianteService){}
  ngOnInit(): void {

    this.estudianteService.obtenerTutoriasEstudiante().pipe(
      tap((res:any)=>{
this.horario=res.data

      })
    ).subscribe()
  }

  descripcion(id_tutoria:any){
    
this.estudianteService.getHorarioForId(id_tutoria).pipe(
  tap((res:any)=>{
    
  this.datosModal=res.data
  
  }  )
).subscribe()
  }
cancelarTutoria(id_tutoria:any){
  Swal.fire({
    title: 'Estas seguro que desea cancelar la tutoria',
    text: "esta accion se puede revertir",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, cancelarTutoria'
  }).then((result) => {
    if (result.isConfirmed) {
      this.estudianteService.cancelarTutoria(id_tutoria)
      Swal.fire(
        'Cancelar tutoria',
        'La tutoria ha sido cancelada',
        'success'
      )
      this.estudianteService.obtenerTutoriasEstudiante().pipe(
        tap((res:any)=>{
  this.horario=res.data
  
        })
      ).subscribe()
      
    }
  })
  
}
  





}

