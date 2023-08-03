import { Component,Input, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { tap } from 'rxjs';
import { DocenteService } from 'src/app/docente/services/docente.service';


@Component({
  selector: 'app-historial-tutorias',
  templateUrl: './historial-tutorias.component.html',
  styleUrls: ['./historial-tutorias.component.scss']
})
export class HistorialTutoriasComponent implements OnInit {


  searchValue = '';
visible = false;
listOfData: any[] = [
  
];
datosModal:any={}
data = [...this.listOfData];
tutorias:any[]=[]
  estudiantes: any[]=[];
constructor(private service:AdminService,private docenteService:DocenteService){




  }


reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.data = this.listOfData.filter((item: any) => item.id_usuario.indexOf(this.searchValue) !== -1);
}

ngOnInit(){
  this.service.getHorarioFinished().pipe(
    tap((res:any)=>{
      this.tutorias=res.data
      
      
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
  

