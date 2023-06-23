import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministradorComponent } from './administrador.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosComponent,AdministradorComponent
  ],
  imports: [
    CommonModule,AdministradorRoutingModule,SharedModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
