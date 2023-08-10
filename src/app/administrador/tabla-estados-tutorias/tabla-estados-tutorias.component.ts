import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

interface DataItem {
  id_estado_tutoria:String
  estado_tutoria:String
}

@Component({
  selector: 'app-tabla-estados-tutorias',
  templateUrl: './tabla-estados-tutorias.component.html',
  styleUrls: ['./tabla-estados-tutorias.component.scss']
})
export class TablaEstadosTutoriasComponent {
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
   
  ];

  estadoTutoria: any[] = []
  estadoTutorias: any[] = []
  estadoTutoriaForm!: FormGroup
  estadoTutoriaAgregar!: FormGroup 

  constructor(private service: AdminService, public fb: FormBuilder) {
    this.estadoTutoriaForm = this.initForm()
    this.estadoTutoriaAgregar = this.initFormEstadoTutoria()
  }


  initForm(): FormGroup {
    return this.fb.group({
      estado_tutoria: ['', Validators.required],
      id_estado_tutoria: ['', Validators.required]
    })
  }

  initFormEstadoTutoria(): FormGroup {
    return this.fb.group({
      estado_tutoria: ['', Validators.required],

    })
  }


  ngOnInit(): void {
    this.service.getEstadoTutoria().pipe(
      tap((res: any) => {
        console.log(res);

        this.estadoTutorias = res.data
        this.listOfData= [...res.data];
      }
      )).subscribe()
  }



  agregar() {
    const estado = this.estadoTutoriaAgregar.value
    console.log(estado);

    this.service.setEstadoTutoria(estado).pipe(
      tap((res: any) => {
        console.log(res);

        if (res.error) {
          Swal.fire("Error al agregar el rol", res.error, "error")
        } else if (res.data) {
          Swal.fire("Añadido exitosamente", res.data, "success")
        }

        this.service.getEstadoTutoria().pipe(
          tap((res: any) => {
            this.estadoTutorias= res.data
          })
        ).subscribe()














      })
    ).subscribe()
  }

  modificar(id_estado_tutoria: string) {

    this.service.getDataForIdEstadoTutoria(id_estado_tutoria).pipe(
      tap((res: any) => {
        console.log(res);

        this.estadoTutoriaForm.patchValue({
          estado_tutoria: res.data.estado_tutoria,
          id_estado_tutoria: res.data.id_estado_tutoria
        })
      })
    ).subscribe()



  }

  onSubmit() {
    const estados = this.estadoTutoriaForm.value
    this.service.actualizarEstadoTutoria(estados).pipe(tap((res: any) => {
      console.log(res);

      if (res.error) {
        Swal.fire("Error al actualizar", res.error, "error")
      } else if (res.success) {
        Swal.fire("Actualizacion exitosa", res.success, "success")




      }


      this.service.getEstadoTutoria().pipe(
        tap((res: any) => {
          this.estadoTutorias = res.data
        })
      ).subscribe()


    })





    ).subscribe()





  }


































  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.estadoTutorias = this.listOfData.filter((item: DataItem) => item.estado_tutoria.indexOf(this.searchValue) !== -1);
  }
}
