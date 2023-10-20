import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { forkJoin, map, tap } from 'rxjs';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocenteService } from 'src/app/docente/services/docente.service';
import { Rol } from 'src/app/shared/interfaces/roles.interface';
import { Programa } from 'src/app/shared/interfaces/Programa.interface';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';
interface DataEstudiante {
  nombre:string
  facultad:string
  celular:string
  correo:string
  id_estado:string
  id:string
}
@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.component.html',
  styleUrls: ['./modificar-estudiante.component.scss']
})
export class ModificarEstudianteComponent implements OnInit {
  
  roles:Rol[]=[]
  constructor(private service:AdminService,public fb:FormBuilder,private apiservice:ApiService){
    this.estudianteForm=this.initForm()
    this.agregarEstudiante=this.initFormTwo()
  }
  ngOnInit(): void {

  forkJoin([
    this.service.getEstudiantes(),
    // this.service.getProgramas(),
    
    // this.service.getEstado()
    this.service.getRoles(),
    this.service.getTipo(),
    this.service.getFacultades()

  ]).subscribe((results:any) => {
    // Procesa los resultados de cada solicitud
    console.log(results);
    
    this.estudiante = results[0].resultado;
    this.roles=results[1]
    this.tipos=results[2].resultado
    console.log(this.tipos)
    this.listOfDisplayData=[...results[0].resultado]

    // this.programas = results[1].data;
    this.facultades = results[3].resultado;
    // this.tipos=results[3].data;
    // this.estados=results[4].data;
  });




  }
  estudiante: DataEstudiante[] = [
    
  ];
agregarEstudiante!:FormGroup
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
initFormTwo():FormGroup{
  return this.fb.group({
    id_rol:['',Validators.required],
    nombres:['',Validators.required],
    numero_documento:['',Validators.required],
    celular:['',Validators.required],
    apellidos:['',Validators.required],
    id_facultad:['',Validators.required],
    correo:['',Validators.required],
    id_tipo_documento:['',Validators.required],
    id_programa:['',Validators.required],
    contraseña:['',Validators.required]



  })
}
onSelect(event:any){
   
   console.log(event)
  this.programas=[]
  const id_facultad=parseInt(event.target.value.split(':')[1])
  console.log(id_facultad)

  this.apiservice.getProgramas(id_facultad).pipe(
    
      map((programas:any)=>programas.resultado)
      
     
      
    
  ).subscribe((programas:Programa[])=>{
  console.log(programas)
    this.programas=programas
    

  })
}


reset(): void {
  this.searchValue = '';
  this.search();
}

search(): void {
  this.visible = false;
  this.listOfDisplayData = this.estudiante.filter((item: DataEstudiante) => item.nombre.indexOf(this.searchValue) !== -1);
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

agregar(){
  const usuario=this.agregarEstudiante.value
  let usuarios: Estudiante = {
    id:undefined,
    nombres: this.agregarEstudiante.value.nombres,
    apellidos: this.agregarEstudiante.value.apellidos,
    id_tipo_documento: this.agregarEstudiante.value.id_tipo_documento,
    numero_documento: this.agregarEstudiante.value.numero_documento,
    celular:this.agregarEstudiante.value.celular.toString(),
    id_facultad: this.agregarEstudiante.value.id_facultad,
    id_programa: this.agregarEstudiante.value.id_programa,
    correo: this.agregarEstudiante.value.correo,
    contraseña: this.agregarEstudiante.value.contraseña,
    id_rol:this.agregarEstudiante.value.id_rol,
    id_estado:1
  }
  console.log(usuario)
  this.apiservice.insertData(usuarios).pipe(
    tap((res:any)=>{
      console.log(res)
    })
  ).subscribe()
}




}
