import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
interface DataItem {
  id_tutoria:string
  id_facultad:string
  id_programa:string
  id_materia:string
  id_sede:string
  id_salon:string
  id_usuario:string
  id_estado_tutoria: string
  cupos:string
  tema:string
  fecha:string
  hora_inicial:string
  hora_final:string
  fecha_generacion_tutoria:string
}
@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss']
})
export class CrearTutoriaComponent {
  @Input() estudiante!:DataItem[]

  searchValue = '';
  visible = false;
listOfData: DataItem[] = [
  {
    id_tutoria:"1",
    id_facultad:"ingenieria",
    id_programa:"sistemas",
    id_materia: "base de datos",
    id_sede:"barranquilla",
    id_salon:"Sala de informatica 18",
    id_usuario:"Evelio arrieta",
    id_estado_tutoria:"pendiente",
    cupos:"25",
    tema:"consultas SQL",
    fecha:"17/06/2023",
    hora_inicial:"7:00 am",
    hora_final:"10:00 am",
    fecha_generacion_tutoria:"16/06/2023 8:00 pm"
  },
  {
    id_tutoria:"2",
    id_facultad:"ingenieria",
    id_programa:"sistemas",
    id_materia: "diseño de aplicaciones",
    id_sede:"barranquilla",
    id_salon:"Sala de informatica 2",
    id_usuario:"Lourdes de avila",
    id_estado_tutoria:"pendiente",
    cupos:"25",
    tema:"Documentacion del proyecto",
    fecha:"18/06/2023",
    hora_inicial:"7:00 am",
    hora_final:"10:00 am",
    fecha_generacion_tutoria:"15/06/2023 5:00 pm"
  }
];
listOfDisplayData = [...this.listOfData];

reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.id_usuario.indexOf(this.searchValue) !== -1);
}


deshabilitar(){
  Swal.fire({
    title: '¿Estas seguro de deshabilitar este horario de tutoria?',
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
        'La tutoria ha sido deshabilitada',
        'success'
      )
    }
  })
}}
  


  
