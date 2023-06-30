import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradorComponent } from './administrador.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarEstudianteComponent } from './agregar-estudiante/agregar-estudiante.component';
import { AgregarDocenteComponent } from './agregar-docente/agregar-docente.component';
import { RegistroModule } from '../pages/registro/registro.module';
import { CrearTutoriaComponent } from './crear-tutoria/crear-tutoria.component';
import { ModificarEstudianteComponent } from './modificar-estudiante/modificar-estudiante.component';
import { ModificarDocenteComponent } from './modificar-docente/modificar-docente.component';
import { NgZorroAntdModule } from '../ngZorroAntdModule';




@NgModule({
  declarations: [
    UsuariosComponent,AdministradorComponent, AgregarDocenteComponent,AgregarEstudianteComponent, CrearTutoriaComponent, ModificarEstudianteComponent, ModificarDocenteComponent
  ],
  imports: [
    CommonModule,AdministradorRoutingModule,SharedModule,ReactiveFormsModule,RegistroModule,NgZorroAntdModule,FormsModule
  ]
})
export class AdminModule { }
