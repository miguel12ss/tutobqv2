import { Component,Input, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { tap } from 'rxjs';
import { DocenteService } from 'src/app/docente/services/docente.service';
@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.component.html',
  styleUrls: ['./registro-actividad.component.scss']
})
export class RegistroActividadComponent {
  searchValue = '';
  visible = false;
  listOfData: any[] = [
    
  ];
  datosModal:any={}
  tutorias:any[]=[]
    estudiantes: any[]=[];
    data:any[]=[]
  constructor(private service:AdminService,private docenteService:DocenteService){
  
  
  
  
    }
  
  
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    
    this.data = this.tutorias.filter((item: any) => item.nombres.indexOf(this.searchValue) !== -1);
  
    console.log(this.data);
  
  }
  
  ngOnInit(){
    this.service.getHorarioFinished().pipe(
      tap((res:any)=>{
        this.tutorias=res.data
        this.data = [...res.data];
        
        
      })
    ).subscribe()
  }
  descripcion(id_tutoria:string){
    console.log(id_tutoria)
    this.docenteService.getHorarioForId(id_tutoria).pipe(
      tap((res:any)=>{
        this.datosModal=res.data
      })
    ).subscribe()
    
  
  
  }
  
  listado(id_tutoria:string){
    this.docenteService.getListado(id_tutoria).pipe(
      tap((res:any)=>{
      
        
  
        this.estudiantes=res.estudiante
        console.log(this.estudiantes);
        
      })
    ).subscribe()
  }
}
