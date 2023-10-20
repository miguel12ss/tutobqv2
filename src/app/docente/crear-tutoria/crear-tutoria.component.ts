import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';
import { tap } from 'rxjs';
import { ComponentService } from 'src/app/components/services/components.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Salon } from 'src/app/shared/interfaces/salones.interface';

@Component({
  selector: 'app-crear-tutoria',
  templateUrl: './crear-tutoria.component.html',
  styleUrls: ['./crear-tutoria.component.scss'],
})
export class CrearTutoriaComponent implements OnInit {
  public horario: any;
  horaMinima: string = '07:00';
  horaMaxima: string = '20:00';
  horaFinalMinima: string = '08:00';
  horaFinalMaxima: string = '21:00';
  horarioForm!: FormGroup;
  horarioFormUpdate!: FormGroup;
  pasarListaForm!: FormGroup;
  dateNext = '';
  salones: Salon[] = [];
  materias: string[] = [];
  sedes: string[] = [];
  programas: string[] = [];
  data: string[] = [];
  salonesActualizar: string[] = [];
  select = '';
  estado: any;
  asistencias:any[]=[]
  public estudiantes: any = [];
  constructor(
    public fb: FormBuilder,
    private docenteService: DocenteService,
    private componentService: ComponentService,
    private cd:ChangeDetectorRef
  ) {
    const dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    this.dateNext = dateToday.toISOString().substring(0, 10);
    console.log(this.dateNext);

    this.pasarListaForm = this.initPasarListaForm();
    this.horarioForm = this.initForm();
    this.horarioForm
      .get('horaInicio')
      ?.valueChanges.subscribe((horaSeleccionada) => {
        const horaFin = this.horarioForm.get('horaFin')?.value;

        if (horaSeleccionada < this.horaMinima) {
          this.horarioForm
            .get('horaInicio')
            ?.setValue(this.horaMinima, { emitEvent: false });
        } else if (horaSeleccionada > this.horaMaxima) {
          this.horarioForm
            .get('horaInicio')
            ?.setValue(this.horaMaxima, { emitEvent: false });
        } else if (horaSeleccionada < horaFin) {
          this.horarioForm
            .get('horaFin')
            ?.setValue(this.horaFinalMaxima, { emitEvent: false });
        } else if (horaSeleccionada == horaFin) {
          this.horarioForm
            .get('horaFin')
            ?.setValue(this.horaFinalMinima, { emitEvent: false });
          this.horarioForm
            .get('horaInicio')
            ?.setValue(this.horaMinima, { emitEvent: false });
        }
      });

    this.horarioForm
      .get('horaFin')
      ?.valueChanges.subscribe((horaSeleccionada) => {
        const horaInicio = this.horarioForm.get('horaInicio')?.value;

        if (horaSeleccionada < this.horaMinima) {
          this.horarioForm
            .get('horaFin')
            ?.setValue(this.horaFinalMinima, { emitEvent: false });
        } else if (horaSeleccionada > this.horaMaxima) {
          console.log(this.horaMaxima);

          this.horarioForm
            .get('horaFin')
            ?.setValue(this.horaFinalMaxima, { emitEvent: false });
        } else if (horaSeleccionada < horaInicio) {
          console.log('hm', horaSeleccionada, 'hi', horaInicio);

          this.horarioForm
            .get('horaInicio')
            ?.setValue(this.horaMinima, { emitEvent: false });
        } else if (horaSeleccionada == horaInicio) {
          this.horarioForm
            .get('horaFin')
            ?.setValue(this.horaFinalMinima, { emitEvent: false });
          this.horarioForm
            .get('horaInicio')
            ?.setValue(this.horaMinima, { emitEvent: false });
        }
      });
    //formulario de actualizar

  }

  initPasarListaForm(): FormGroup {
    return this.fb.group({
      id_usuario: this.fb.array([]),
      asistencia: this.fb.array([]),
      id_tutoria: this.fb.array([]),
    });
  }
changeValue(index:number){
  const value=this.pasarListaForm?.value.asistencia.at(index)
 if(value){
  
  this.asistenciasArray.at(index).setValue(false)
 }else{
  this.asistenciasArray.at(index).setValue(true)

 }
}


  pasarLista() {
    this.asistencias=[]
    const estudiantes = this.pasarListaForm?.value;

    for (let index = 0; index < estudiantes.id_usuario.length; index++) {
      const id_usuario = estudiantes.id_usuario[index];
      const asistencia=estudiantes.asistencia[index]===false?0:1
      const id_tutoria = estudiantes.id_tutoria[index];

      const estudiante={
        "id_usuario": id_usuario,
        "asistencia": asistencia,
        "id_tutoria":id_tutoria
      }
      this.asistencias.push(estudiante)
    }
this.docenteService.pasarLista(this.asistencias)  
    
  }
  get idUsuarioArray() {
    return this.pasarListaForm.get('id_usuario') as FormArray;
  }

  get asistenciasArray() {
    return this.pasarListaForm.get('asistencia') as FormArray;
  }

  get idTutoriaArray() {
    return this.pasarListaForm.get('id_tutoria') as FormArray;
  }

  ngOnInit(): void {
    this.docenteService
      .getHorario()
      .pipe(
        tap((res: any) => {
          this.horario = res.data;
          console.log(this.horario);
        })
      )
      .subscribe();
    this.docenteService
      .getSalones()
      .pipe(
        tap((res: any) => {
          console.log(res.resultado)
          this.salones = res.resultado;
        })
      )
      .subscribe();

    this.docenteService
      .getMaterias()
      .pipe(
        tap((res: any) => {
          this.materias = res;
        })
      )
      .subscribe();

    this.docenteService
      .getSedes()
      .pipe(
        tap((res: any) => {
          this.sedes = res;
        })
      )
      .subscribe();
    this.componentService.getPrograms
      .pipe(
        tap((res: any) => {
          this.programas = res;
        })
      )
      .subscribe();
    this.docenteService
      .getDataForId()
      .pipe(
        tap((res: any) => {
          this.horarioForm.patchValue({
            facultad: res.data.facultad,
            docente: res.data.nombre,
          });
        })
      )
      .subscribe();
  }

  initForm(): FormGroup {
    return this.fb.group({
      facultad: [null, Validators.required],
      tema: [null, Validators.required],
      capacidad: [null, Validators.required],
      horaInicio: [null, Validators.required],
      programa: [null, Validators.required],
      sede: [null, Validators.required],
      docente: [null, Validators.required],
      horaFin: [null, Validators.required],
      materia: [null, Validators.required],
      salon: [null, Validators.required],
      fecha: [null, Validators.required],
    });
  }
  onSelect(event: any) {
    const salon = event.target.value;
    this.docenteService
      .obtenerCapacidadPorSalon(salon)
      .pipe(
        tap((res: any) => {
          console.log(res);

          console.log(res.data.capacidad);

          this.horarioForm.patchValue({
            capacidad: res.data.capacidad,
            sede: res.data.sede,
          });
        })
      )
      .subscribe();
  }

  onSubmit() {
    const horario = this.horarioForm.value;
    this.docenteService
      .crearHorario(horario)
      .pipe(
        tap((res: any) => {
          console.log(res);
          if (res.error) {
            Swal.fire('Error', res.error, 'warning');
            return;
          }
          this.docenteService
            .getHorario()
            .pipe(
              tap((res: any) => {
                this.horario = res.data;
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  listado(id_tutoria: string) {
    
    this.idUsuarioArray.clear();
    this.asistenciasArray.clear();
    this.docenteService
      .getListado(id_tutoria)
      .pipe(
        tap((res: any) => {
         
          console.log(res.estudiante);
          
          this.estudiantes = res.estudiante;

           this.estudiantes.forEach((estudiante: any) => {
            this.idUsuarioArray.push(new FormControl(estudiante.id_usuario));
            this.asistenciasArray.push(
              new FormControl(estudiante.asistencia===1)
            );
            this.idTutoriaArray.push(
              new FormControl(estudiante.id_tutoria)
            );
          });
        })
      )
      .subscribe();
  }























  getData(id_tutoria: string) {
    Swal.fire({
      title: 'Estas seguro que deseas eliminarlo',
      text: 'no podra ser revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'La tutoria ha sido eliminada.', 'success');
        this.docenteService.eliminarTutoria(id_tutoria);
        this.docenteService
          .getHorario()
          .pipe(
            tap((res: any) => {
              console.log(res);

              this.horario = res.data;
            })
          )
          .subscribe();
      }
    });
  }
}
