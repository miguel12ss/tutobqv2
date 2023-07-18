import { Component } from '@angular/core';
import Swal from 'sweetalert2';
interface DataEstudiante {
  nombre:string
  programa:string
  telefono:string
  numeroCedula:string
  correo:string
}
@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.component.html',
  styleUrls: ['./modificar-estudiante.component.scss']
})
export class ModificarEstudianteComponent {
  estudiante: DataEstudiante[] = [
    {
      nombre: 'Miguel Suarez',
      programa: 'ingenieria',
      telefono: '3158245114',
      numeroCedula:'1024771216',
      correo:'miguel@unibarranquilla.edu.co'
    },
    {
      nombre: 'lucho arrieta',
      programa: 'ingenieria',
      telefono: '3158245114',
      numeroCedula:'1024771216',
      correo:'lucho @unibarranquilla.edu.co'
    },
    {
      nombre: 'Joshua cafronni',
      programa: 'ingenieria',
      telefono: '3158245114',
      numeroCedula:'1024771216',
      correo:'joshua@unibarranquilla.edu.co'
    },
    {
      nombre: 'Alan guerra',
      programa: 'ingenieria',
      telefono: '3158245114',
      numeroCedula:'1024771216',
      correo:'Alang@unibarranquilla.edu.co'
    }
  ];

  
searchValue = '';
visible = false;

listOfDisplayData = [...this.estudiante];

reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.estudiante.filter((item: DataEstudiante) => item.nombre.indexOf(this.searchValue) !== -1);
}


deshabilitar(){
  Swal.fire({
    title: 'Estas seguro de deshabilitar este docente',
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
        'el docente ha sido deshabilitado',
        'success'
      )
    }
  })
}
}
