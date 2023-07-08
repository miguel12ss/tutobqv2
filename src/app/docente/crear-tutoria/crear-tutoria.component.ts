import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss']
})
export class CrearTutoriaComponent {
horarioForm!: FormGroup;
fechaHoy=''

constructor(public fb:FormBuilder){
  const dateToday=new Date();
  this.fechaHoy = dateToday.toISOString().substring(0, 10);
  console.log(this.fechaHoy);
  this.horarioForm=this.initForm()

}


onSubmit(){
console.log(this.horarioForm.value);

}

initForm():FormGroup{
  return this.fb.group({
    facultad:[null,Validators.required],
    tema:[null,Validators.required],
    capacidad:[null,Validators.required],
    horaInicio:[null,Validators.required],
    programa:[null,Validators.required],
    sede:[null,Validators.required],
    docente:[null,Validators.required],
    horaFin:[null,Validators.required],
    materia:[null,Validators.required],
    salon:[null,Validators.required],
    fecha:[null,Validators.required],

  })
}


}
