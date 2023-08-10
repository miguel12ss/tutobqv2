import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

interface DataItem {
  id_estado:String
  estado:String
}

@Component({
  selector: 'app-tabla-estados',
  templateUrl: './tabla-estados.component.html',
  styleUrls: ['./tabla-estados.component.scss']
})
export class TablaEstadosComponent {
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    
  ];
 
estado: any[] = []
  estados: any[] = []
  estadoForm!: FormGroup
  estadoAgregar!: FormGroup 

  constructor(private service: AdminService, public fb: FormBuilder) {
    this.estadoForm = this.initForm()
    this.estadoAgregar = this.initFormEstado()
  }


  initForm(): FormGroup {
    return this.fb.group({
      estado: ['', Validators.required],
      id_estado: ['', Validators.required]
    })
  }

  initFormEstado(): FormGroup {
    return this.fb.group({
      estado: ['', Validators.required],

    })
  }


  ngOnInit(): void {
    this.service.getEstado().pipe(
      tap((res: any) => {
        console.log(res);

        this.estados = res.data
       this.listOfData = [...res.data];
      }
      )).subscribe()
  }


  agregar() {
    const estado = this.estadoAgregar.value
    console.log(estado);

    this.service.setEstado(estado).pipe(
      tap((res: any) => {
        console.log(res);

        if (res.error) {
          Swal.fire("Error al agregar estado de usuario", res.error, "error")
        } else if (res.data) {
          Swal.fire("Añadido exitosamente", "El estado de usuario ha sido Añadido con exito", "success")
        }

        this.service.getEstado().pipe(
          tap((res: any) => {
            this.estados= res.data
          })
        ).subscribe()














      })
    ).subscribe()
  }

  modificar(id_estado: string) {

    this.service.getDataForIdEstado(id_estado).pipe(
      tap((res: any) => {
        console.log(res);

        this.estadoForm.patchValue({
          estado: res.data.estado,
          id_estado: res.data.id_estado
        })
      })
    ).subscribe()



  }

  onSubmit() {
    const estados = this.estadoForm.value
    this.service.actualizarEstado(estados).pipe(tap((res: any) => {
      console.log(res);

      if (res.error) {
        Swal.fire("Error al actualizar", res.error, "error")
      } else if (res.success) {
        Swal.fire("Actualizacion exitosa", res.success, "success")




      }


      this.service.getEstado().pipe(
        tap((res: any) => {
          this.estados = res.data
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
    this.estados = this.listOfData.filter((item: DataItem) => item.estado.indexOf(this.searchValue) !== -1);
  }
}
