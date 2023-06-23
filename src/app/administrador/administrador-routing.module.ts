import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';

const routes: Routes = [
  {path:'',component:AdministradorComponent,children:[
    {path:'',redirectTo:'agregar',pathMatch:'full'},
    {path:'agregar',loadChildren:()=>import('./usuarios/usuarios.module').then(m=>m.UsuariosModule)},
    // {path:'crearTutoria',loadChildren:()=>import('./crear-tutoria/crear-tutoria.module').then(m=>m.CrearTutoriaModule)},
  
  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
