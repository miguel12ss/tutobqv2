import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { forkJoin, map, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/shared/interfaces/roles.interface';
import { Programa } from 'src/app/shared/interfaces/Programa.interface';
import { ApiService } from 'src/app/services/api.service';
import { Estudiante } from 'src/app/shared/interfaces/Estudiante.interface';
import { NzTabPosition } from 'ng-zorro-antd/tabs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { DocenteService } from 'src/app/docente/services/docente.service';
interface DataEstudiante {
  nombre:string,
  apellido:string,
  facultad:string
  celular:string
  correo:string
  id_estado:string
  id:string
  numero_documento:string
  tipo_documento:string
  programa:string
  
}
@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.component.html',
  styleUrls: ['./modificar-estudiante.component.scss']
})
export class ModificarEstudianteComponent implements OnInit {
  public selectedFile!:File
  public fileForm!:FormGroup
  roles:Rol[]=[]
  router=inject(Router)
  docenteService=inject(DocenteService);
  constructor(private service:AdminService,public fb:FormBuilder,private apiservice:ApiService){
    this.estudianteForm=this.initForm()
    this.agregarEstudiante=this.initFormTwo()
  }
  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      this.tabs.push({
        name: `Tab ${i}`,
        disabled: i === 28,
        content: `Content of tab ${i}`
      });
    }

  forkJoin([
   
    this.service.getRoles(),
    this.service.getTipo(),
    this.service.getFacultades(),
    this.service.getEstudiantes(),
   

  ]).subscribe((results:any) => {
    // Procesa los resultados de cada solicitud
    console.log(results);
    
    this.roles=results[0]
    this.tipos=results[1].resultado
    console.log(this.tipos)
    this.listOfDisplayData=[...results[3].resultado]

    // this.programas = results[1].data;
    this.facultades = results[2].resultado;
    this.estudiante = results[3 ].resultado;

    console.log(this.facultades)
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
   
   
  this.programas=[]
  const id_facultad=parseInt(event.target.value.split(':')[1])
  console.log(id_facultad)

  this.docenteService.getProgramsForFaculty(id_facultad.toString()).pipe(
    
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

//tabs
tabs: Array<{ name: string; content: string; disabled: boolean }> = [];
  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 27;
downloadPDF(){
  const doc=new jsPDF()
  doc.text('Listado de estudiantes',10,10)

  //generar contenido del pdf
  const columns=['ID','Nombres','Apellidos','Telefono', 'tipo_documento', 'numero_documento' ,'Programa', 'Correo']
  const content=this.estudiante.map((student,index)=>[index+1,student.nombre,student.apellido,student.celular,student.tipo_documento,student.numero_documento,student.programa,student.correo])
  
 
  console.log(content)
  const tableWidth = 300; // Ancho de la tabla en unidades (mm por defecto)
    const startY = 20; // Posición vertical inicial de la tabla en unidades

    // Configura el ancho de las columnas
    const columnWidths = [10, 40, 40, 30, 35, 40, 40, 45]; // Ancho de cada columna en unidades

    // Crea la tabla en el PDF utilizando jspdf-autotable
    (doc as any).autoTable({
      head: [columns],
      body: content,
      startY: startY,
      tableWidth: tableWidth,
      columnStyles: {
        0: { cellWidth: columnWidths[0] },
        1: { cellWidth: columnWidths[1] },
        2: { cellWidth: columnWidths[2] },
        3: { cellWidth: columnWidths[3] },
        4: { cellWidth: columnWidths[4] },
        5: { cellWidth: columnWidths[5] },
        6: { cellWidth: columnWidths[6] },
        7: { cellWidth: columnWidths[7] },
      },
      styles: { 
        
        fontSize:10,
        valign: 'middle', halign: 'center' },
    });
  // Guarda o descarga el PDF
  doc.save('listado_estudiantes.pdf');
}

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  log(args: any[]): void {  
    console.log(args);
    // this.router.navigate(['//modificar-docente'])
  }


  onChange(event:any){
    const facultad = event.target.value;
    console.log(facultad)
    const id_facultad:string=facultad.split(':')[1]
    
    console.log(id_facultad)
    this.docenteService
      .getProgramsForFaculty(id_facultad)
      .pipe(
        tap((res: any) => {
        console.log(res)

         this.programas=res.resultado})
      )
      .subscribe();
  }
  uploadFile(){
    if (!this.selectedFile) {
      return;
    }
      this.service.uploadFile(this.selectedFile).pipe(
        tap((res:any)=>{
          console.log(res)
        if(res.message.resultado){
          Swal.fire("Carga masiva","los usuarios han sido registrados con exito","success")
          this.service.getEstudiantes().pipe(
            tap((res:any)=>{
              this.estudiante=res.resultado
              this.listOfDisplayData=[...res.resultado]

            })
          )

          }else{
            console.log(res)
            Swal.fire("Error en la carga masiva",res.message.error,'error')
          }
        })
  
      ).subscribe()

    }
    
  

  selectFile(event:any){
    this.selectedFile=event.target.files[0]
    
  }

}
  






