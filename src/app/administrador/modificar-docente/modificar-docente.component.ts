import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
interface DataItem {
  nombre:string
  facultad:string
  telefono:string
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
export class ModificarDocenteComponent {
@Input() estudiante!:DataItem[]
//   docente: Docente[] = [
//     {nombre:'lourdes de avila',
//     facultad:'ingenierias',
//     telefono:'123456789'  ,
//     numeroCedula:'1248125',
//     correo:'lourdes@gmail.com'
  
//   },
//   {nombre:'miguel angel suarez plata',
//   facultad:'ingenierias',
//   telefono:'123456789'  ,
//   numeroCedula:'1248125',
//   correo:'lourdes@gmail.com'

// }


//   ];}


searchValue = '';
visible = false;
listOfData: DataItem[] = [
  {
    nombre: 'Lourdes de avila',
    facultad: 'ingenierias',
    telefono: '3158245114',
    numeroCedula:'1024771216',
    correo:'lourdes@unibarranquilla.edu.co'
  },
  {
    nombre: 'Evelio arrieta',
    facultad: 'ingenierias',
    telefono: '3158245114',
    numeroCedula:'1024771216',
    correo:'evelio@unibarranquilla.edu.co'
  },
  {
    nombre: 'Joshua cafronni',
    facultad: 'ingenierias',
    telefono: '3158245114',
    numeroCedula:'1024771216',
    correo:'joshua@unibarranquilla.edu.co'
  },
  {
    nombre: 'Alan guerra',
    facultad: 'ingenierias',
    telefono: '3158245114',
    numeroCedula:'1024771216',
    correo:'Alang@unibarranquilla.edu.co'
  }
];
listOfDisplayData = [...this.listOfData];

reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.nombre.indexOf(this.searchValue) !== -1);
}


deshabilitar(){
  Swal.fire({
    title: '¿Estas seguro de deshabilitar este docente?',
    text: "esta accion se puede revertir",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, deshabilito'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deshabilitado',
        'El docente ha sido deshabilitado',
        'success'
      )
    }
  })
}}
  

