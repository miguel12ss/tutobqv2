import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';

const routes: Routes = [
  {
    path: '',
    component: AdministradorComponent,
    children: [
      { path: '', redirectTo: 'deshabilitar-docente', pathMatch: 'full' },
      {
        path: 'agregar',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'agregar/estudiante',
        loadChildren: () =>
          import('./agregar-estudiante/agregar-estudiante.module').then(
            (m) => m.AgregarEstudianteModule
          ),
      },
      {
        path: 'agregar/docente',
        loadChildren: () =>
          import('./agregar-docente/agregar-docente.module').then(
            (m) => m.AgregarDocenteModule
          ),
      },
      {
        path: 'modificar-docente',
        loadChildren: () =>
          import('./modificar-docente/modificar-docente.module').then(
            (m) => m.ModificarDocenteModule
          ),
      },
      {
        path: 'modificar-estudiante',
        loadChildren: () =>
          import('./modificar-estudiante/modificar-estudiante.module').then(
            (m) => m.ModificarEstudianteModule
          ),
      },{
        path: 'tablafacultades',
        loadChildren: () =>
          import('./tablafacultades/tablafacultades.module').then(
            (m) => m.TablafacultadesModule
          ),
      },{
        path: 'historial-tutorias',
        loadChildren: () =>
          import('./historial-tutorias/historial-tutorias.module').then(
            (m) => m.HistorialTutoriasModule
          ),
      },
      {path:'crear-tutoria',loadChildren:()=>import('./crear-tutoria/crear-tutoria.module').then(m=>m.CrearTutoriaModule)},
      {path:'**',redirectTo:'deshabilitar-docente'}

  
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorRoutingModule {}
