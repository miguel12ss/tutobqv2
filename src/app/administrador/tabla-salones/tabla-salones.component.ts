import { Component,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

interface DataItem {
  id_salon:String
  capacidad:String
  salon:String
  id_sede:String
}
@Component({
  selector: 'app-tabla-salones',
  templateUrl: './tabla-salones.component.html',
  styleUrls: ['./tabla-salones.component.scss']
  
})
export class TablaSalonesComponent {
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
   
  ];
  
  salones:any[]=[]
  salon:any[]=[]
  salonForm!:FormGroup
  salonAgregar!:FormGroup

  listOfDisplayData = [...this.listOfData];
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.salon.indexOf(this.searchValue) !== -1);
  }
  constructor(private service:AdminService,public fb:FormBuilder){
    this.salonForm=this.initForm()
    this.salonAgregar=this.initFormSalon()
  }
  initFormSalon():FormGroup{
    return this.fb.group({
      sede:['',Validators.required],
      salon:['',Validators.required],
      capacidad:['',Validators.required]
      
    })
  }

  initForm():FormGroup{
    return this.fb.group({
      id_salon:['',Validators.required],
      sede:['',Validators.required],
      salon:['',Validators.required],
      capacidad:['',Validators.required]
    })
  }


modificar(id_salon:string){

  this.service.getDataForIdSalon(id_salon).pipe(
    tap((res:any)=>{
      console.log(res.data);
      
      console.log(res.data.sede);
      
      this.salonForm.patchValue({
        salon:res.data.salon,
        sede:res.data.sede,
        capacidad:res.data.capacidad,
        id_salon:res.data.id_salon
      })
    })
  ).subscribe()
}



ngOnInit(): void {
  this.service.getSalones().pipe(
    tap((res:any)=>{
      console.log(res);
      
this.salones=res.data
    }
  )).subscribe()
}


onSubmit(){

}

agregar(){

}
}
