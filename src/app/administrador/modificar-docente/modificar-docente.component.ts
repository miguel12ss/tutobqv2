import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { tap,forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface DataItem {
  nombres:string
  facultad:string
  celular:string
  numeroCedula:string
  correo:string
}

// interface Docente{
//   nombre:string
//   facultad:string
//   telefono:string
//   numeroCedula:string
//   correo:string
// }
// interface ColumnItem {
//   name: string;
//   sortOrder: NzTableSortOrder | null;
//   sortFn: NzTableSortFn<DataItem> | null;
//   listOfFilter: NzTableFilterList;
//   filterFn: NzTableFilterFn<DataItem> | null;
// }

@Component({
  selector: 'app-modificar-docente',
  templateUrl: './modificar-docente.component.html',
  styleUrls: ['./modificar-docente.component.scss']
})
export class ModificarDocenteComponent implements OnInit {
@Input() estudiante!:DataItem[]

constructor(private service:AdminService,public fb:FormBuilder){
  this.docenteForm=this.initForm()
}
facultades:any[] =[]
tipos:any[]=[]
estados:any[]=[]
searchValue = '';
visible = false;
listOfData: DataItem[] = [
  
];
listOfDisplayData:any[] = [];
docenteForm!:FormGroup
ngOnInit(): void {
//   this.service.getDocentes().pipe(
//     tap((res:any)=>{
//       console.log(res.data);
      
// this.listOfData=res.data
// this.listOfDisplayData=[...res.data]
//     })
//   ).subscribe()

  forkJoin([

    this.service.getTutorias(),
    // this.service.getFacultades(),
    // this.service.getTipo(),
    // this.service.getEstado()
  ]
    
  ).subscribe((results:any) => {
    // Procesa los resultados de cada solicitud
    console.log(results);
    
    this.listOfData = results[0];
    this.listOfDisplayData=[...this.listOfData]
    this.facultades = results[1].data;
    this.tipos=results[2].data;
    this.estados=results[3].data
  });

}

onSubmit(){
  
  const docente=this.docenteForm.value;
  const id_usuario=this.docenteForm.get('id_usuario')?.value
  this.service.actualizarDocente(id_usuario,docente)

}

reset(): void {
  this.searchValue = '';
  this.search();
}

initForm():FormGroup{
  return this.fb.group({
    nombres:[''],
    apellidos:[''],
    celular:[''],
    facultad:[''],
    numero_documento:['',],
    tipo_documento:[''],
    id_usuario:['',],
    correo:['',Validators.email],
    estado:['']
  })
}


search(): void {
  this.visible = false;
  this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.nombres.indexOf(this.searchValue) !== -1);
}

modificar(id_usuario:string){
  this.service.getDocenteForId(id_usuario).pipe(
    tap((res:any)=>{
      console.log(res.data.nombres);
      
      this.docenteForm.patchValue({
        nombres:res.data.nombres,
        apellidos:res.data.apellidos,
        celular:res.data.celular,
        tipo_documento:res.data.tipo_documento,
        id_usuario:res.data.id_usuario,
        correo:res.data.correo,
        facultad:res.data.facultad,
        numero_documento:res.data.numero_documento,
        estado:res.data.estado


      })
      
    })
  ).subscribe()
}


}
  

