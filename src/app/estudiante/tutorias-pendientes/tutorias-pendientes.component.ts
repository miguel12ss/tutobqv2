import { Component } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-tutorias-pendientes',
  templateUrl: './tutorias-pendientes.component.html',
  styleUrls: ['./tutorias-pendientes.component.scss']
})
export class TutoriasPendientesComponent {
showAlert(){
Swal.fire(
  "la clase de poo se tratara temas acerca de las clases objetos "
)
}}

