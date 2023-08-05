import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { forkJoin, tap } from 'rxjs';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocenteService } from 'src/app/docente/services/docente.service';
interface DataEstudiante {
  nombres:string
  facultad:string
  celular:string
  correo:string
  id_estado:string
  id_usuario:string
}
@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.component.html',
  styleUrls: ['./modificar-estudiante.component.scss']
})
export class ModificarEstudianteComponent implements OnInit {
  
  constructor(private service:AdminService,public fb:FormBuilder,private ds:DocenteService){
    this.estudianteForm=this.initForm()
  }
  ngOnInit(): void {

  forkJoin([
    this.service.getEstudiantes(),
    this.service.getProgramas(),
    this.service.getFacultades(),
    this.service.getTipo(),
    this.service.getEstado()
  ]).subscribe((results:any) => {
    // Procesa los resultados de cada solicitud
    console.log(results);
    
    this.estudiante = results[0].data;
    this.programas = results[1].data;
    this.facultades = results[2].data;
    this.tipos=results[3].data;
    this.estados=results[4].data;
  });




  }
  estudiante: DataEstudiante[] = [
    
  ];

estudianteForm!:FormGroup
searchValue = '';
visible = false;
facultades:any[]=[]
programas:any[]=[]
tipos:any[]=[]
estados:any[]=[]
listOfDisplayData = [...this.estudiante];
usuarioForm=[]
modificar(id_usuario:string){
  this.service.getEstudiante(id_usuario).pipe(
    tap((res:any)=>{
      console.log(res.data.tipo_documento);
      
      this.estudianteForm.patchValue({
        nombres:res.data.nombres,
        apellidos:res.data.apellidos,
        numero_documento:res.data.numero_documento,
        celular:res.data.celular,
        facultad:res.data.facultad,
        correo:res.data.correo,
        programa:res.data.programa,
        tipo_documento:res.data.tipo_documento,
        estado:res.data.estado,
        id_usuario:res.data.id_usuario
        
      })
    })
  ).subscribe()
}
initForm():FormGroup{
  return this.fb.group({
    nombres:['',Validators.required],
    numero_documento:['',Validators.required],
    celular:['',Validators.required],
    apellidos:['',Validators.required],
    facultad:['',Validators.required],
    correo:['',Validators.required],
    tipo_documento:['',Validators.required],
    programa:['',Validators.required],
    estado:['',Validators.required],
    id_usuario:['',Validators.required]



  })
}

reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.estudiante.filter((item: DataEstudiante) => item.nombres.indexOf(this.searchValue) !== -1);
}


deshabilitar(id_estudiante:string){
  Swal.fire({
    title: '¿Estas seguro de deshabilitar este estudiante?',
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
        'El estudiante ha sido deshabilitado',
        'success'
      )
    }
    this.service.deshabilitar(id_estudiante)
  
  })
  this.service.getEstudiantes().pipe(
    tap((res:any)=>{
      this.estudiante=res.data
    })
  ).subscribe()
  
}


habilitar(id_usuario:string){

} 

onSubmit(){
 const estudiante=this.estudianteForm.value
 const id=this.estudianteForm.get('id_usuario')?.value
 console.log(id);
 
this.service.actualizarEstudiante(id,estudiante)




}




}
