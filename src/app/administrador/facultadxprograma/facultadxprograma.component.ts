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
  selector: 'app-facultadxprograma',
  templateUrl: './facultadxprograma.component.html',
  styleUrls: ['./facultadxprograma.component.scss']
})
export class FacultadxprogramaComponent {
  @Input() tablafacultades!:DataItem[]
  searchValue = '';
  visible = false;
  listOfData: any[] = [
  ];
  facultades:any[]=[]
  facultad:any[]=[]
  listOfDisplayData:any = [];
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
    this.facultades = this.listOfDisplayData.filter((item: DataItem) => item.facultad.indexOf(this.searchValue) !== -1);
  }

  ngOnInit(): void {
    this.service.getFacultades().pipe(
      tap((res:any)=>{
        console.log(res);
        
this.facultades=res.data
this.listOfDisplayData = [...this.facultades];

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
      
        if(res.error=="La facultad ya se encuentra registrada en el sistema"){
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
        
        if(res.error=="La facultad ya se encuentra registrada en el sistema"){
          Swal.fire("Error al agregar facultad",res.error,"error")
      }else if(res.data){
        Swal.fire("Añadido exitosamente","La facultad ha sido agregada con exito","success")
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
