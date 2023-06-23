import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearTutoriaComponent } from './crear-tutoria/crear-tutoria.component';

import { SidebarDocenteComponent } from '../shared/sidebar-docente/sidebar-docente.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteComponent } from './docente.component';


@NgModule({
  declarations: [
    PerfilComponent,
    CrearTutoriaComponent,DocenteComponent
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,ReactiveFormsModule,SharedModule
  ]
})
export class DocenteModule { }
