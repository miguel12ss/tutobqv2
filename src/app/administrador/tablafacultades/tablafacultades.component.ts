import { Component,Input, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface DataItem {
  id_facultad:String
  facultad:String
}
@Component({
  selector: 'app-tablafacultades',
  templateUrl: './tablafacultades.component.html',
  styleUrls: ['./tablafacultades.component.scss']
})
export class TablafacultadesComponent implements OnInit {

  @Input() tablafacultades!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: any[] = [
  ];
  facultades:any[]=[]
  facultad:any[]=[]
  listOfDisplayData = [...this.listOfData];
  facultadForm!:FormGroup
  facultadAgregar!:FormGroup



  constructor(private service:AdminService,public fb:FormBuilder){
    this.facultadForm=this.initForm()
    this.facultadAgregar=this.initFormFacultad()
  }
 
initFormFacultad():FormGroup{
  return this.fb.group({
    facultad:['',Validators.required],
    
  })
}


  initForm():FormGroup{
    return this.fb.group({
      facultad:['',Validators.required],
      id_facultad:['',Validators.required]
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.facultad.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    this.service.getFacultades().pipe(
      tap((res:any)=>{
        console.log(res);
        
this.facultades=res.data
      }
    )).subscribe()
  }


  actualizar(id_tutoria:string){
    // this.service.actualizarFacultad(id_tutoria).pipe(
    //   tap((res:any)=>{
    //     if(res.message=="success"){Swal.fire("Actualizar facultad",'la facultad se ha actualizado','success')}
    //   })
    // ).subscribe()
  }
  modificar(id_facultad:string){
    this.service.getDataForIdFacultad(id_facultad).pipe(
      tap((res:any)=>{
        this.facultadForm.patchValue({
          facultad:res.data.facultad,
          id_facultad:res.data.id_facultad
        })
      })
    ).subscribe()
  }
  onSubmit(){
    const facultades=this.facultadForm.value
    this.service.actualizarFacultad(facultades).pipe(tap((res:any)=>{
      console.log(res);
      
        if(res.error=="el nombre de la tabla ya se encuentra registrado en el programa"){
          Swal.fire("Error al actualizar",res.error,"error")
      }else if(res.success){
        Swal.fire("Actualizacion exitosa","La facultad ha sido actualizada con exito","success")
        



      }


      this.service.getFacultades().pipe(
        tap((res:any)=>{
          this.facultades=res.data
        })
      ).subscribe()


    })




    
  ).subscribe()
  }


  agregar(){
    const facultad=this.facultadAgregar.value
    console.log(facultad);
    
    this.service.setFacultad(facultad).pipe(
      tap((res:any)=>{
        console.log(res);
        
        if(res.error=="la facultad ya se encuentra registrada en el sistema"){
          Swal.fire("Error al agregar facultad",res.error,"error")
      }else if(res.data){
        Swal.fire("Añadido exitosamente","La facultad ha sido Añadido con exito","success")
      }
      
      this.service.getFacultades().pipe(
        tap((res:any)=>{
          this.facultades=res.data
        })
      ).subscribe()









      



      
    })
    ).subscribe()
  }
}